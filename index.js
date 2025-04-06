// metodos de la promesa -> then - catch - finally
// yup -> chusmear.
// Servidor web 
import express from 'express';
import { readFile } from 'node:fs';
import fs from 'node:fs/promises'
import path from 'node:path';

const app = express();

//Midward
app.use(express.urlencoded({extended:true}))
// extended , para que acepte la version extendida. 

app.set('view engine', 'ejs') // Especificamos el motor 
app.set('views', './views');// Especificamos la carpeta de las vistas

// Creamos una funcion para leer productos: 
async function getProductos(){
  return fs.readFile(path.resolve('./data/products.json'))
    .then((data) =>{
      return JSON.parse(data.toString())
    })
};

// Creamos una funcion para escribir el archivo: 
async function saveProductos(productos){
  return fs.writeFile(path.resolve('./data/products.json'), JSON.stringify(productos))
}

async function isValido(identidad) {
  const listaProductos = await getProductos();
  return listaProductos.find((p) => p.id == identidad);
} 

app.get('/productos', (req,res) => {
  getProductos()  
  .then((objectList)=>{
      res.render('producto',{objectList});      
    })
    .catch((err)=>{
      res.send(err.message);
    })  
})

// Creamos un nueva peticion para agregar productos: 
// http:/localhost:9000/agregarProductos
app.get('/agregarProductos', (req, res) => {
  res.render('addProducto', {});
})

// Creamos una nuva peticion, para agregar productos: 
// http:/localhost:9000/modicarProductos:
app.get('/modificarProductos', (req,res) => {
  res.render('changeProducto',{});

})

// Creamos una nuva peticion, para agregar productos: 
// http:/localhost:9000/elminarProductos:
app.get('/eliminarProductos' ,(req,res) => {
  res.render('deleteProducto',{})
})


// Atendemos los datos enviados del usario a travez del formulario
// http:/localhost:9000/modicarProductos:
app.post('/modificarProductos', async (req,res) => {
  console.log(req.body);
  
  const listaProductos = await getProductos(); 
  
  /////////////////////////////////////////////////////////////////
  const isValido = listaProductos.find((producto) => producto.id == req.body.id)
  
  //if(!isValido) return res.sendFile(path.resolve('./views/noEncontrado.ejs'));
  if(!isValido) return res.status(404).render('noEncontrado');
  // codigo 404 no encontrado.
  /////////////////////////////////////////////////////////////////
  // Buscamos el objeto. 
  const nuevaListaProductos = listaProductos.map((producto) => {
    if(producto.id != req.body.id) return producto; // early return
    
    return {
      ... producto, // copiamos las propiedades del objeto original 
      name:req.body.name, // modificamos sus valores.
      description:req.body.description, 
    }
  })

  await saveProductos(nuevaListaProductos);

  //res.end();
  res.redirect('/productos');

})


// Atendemos los datos enviados del usario a travez del formulario
// http:/localhost:9000/elminarProductos:
app.post('/eliminarProductos', async(req,res) => {
  
  const identidad = req.body.id
  console.log(identidad)
  const encontado = await isValido(identidad);
  if(!encontado) return res.status(404).render('noEncontrado'); 
  
  const listaProductos = await getProductos(); 

  const nuevaListaProductos = listaProductos.filter((producto) => {
    if(producto.id != identidad) return producto; 
  })

  await saveProductos(nuevaListaProductos);

  res.redirect('/productos');

})


//Atendemos los datos enviados del usario a travez del formulario
// http:/localhost:9000/agregarProductos
app.post('/agregarProductos', async (req,res) =>{
  console.log('Obtuvimos el body');
  // console.log(req.body.name , req.body.description);
  /* 
    * leer el archivo. Al ser asincronico utilizamos el 'await'
    * Guardar el retorno en una variable(array). 
    * Crear un objeto Json.
    * Setear sus valores ingresado desde el usuario. 
    * Pushearlo al array 
    * Guardarlo en el sistema operativo 
  */
  // obetenmos la lista de productos
  const listaProductos = await getProductos();
  // Creamos el objeto
  const producto = { 
    id:listaProductos.length + 1,
    name : req.body.name,
    description: req.body.description
  };

  //console.log(producto);

  listaProductos.push(producto);

  await saveProductos(listaProductos);
  
  //res.end(); // finalizacion. 
  res.redirect('/productos');
})


app.listen(9000, ()=>{
  console.log('Inicio del servidor en http://localhost:9000');
})


/*
  TODO: Incorporart baja lógica, para los id no se repitan:
*/