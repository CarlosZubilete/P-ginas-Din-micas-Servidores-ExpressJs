import http from 'node:http';
import fs from 'node:fs/promises';
/* // creamos el seridor 
const app = http.createServer((request,response) =>{

  console.log('Recibimos una petición'); 
    // Nos avisa por consola , se quede cargando la pag. 
    
  // (resquest.url) -> captamos lo que escribio el usuario.
  // cada vez que acceda a: http://localhost:3000/miweb
  response.write(`
    <h1> Hola mundo </h1>
    <p> Esta intentando accdera a ${request.url} </p>`);

  response.end() // Finaliza la peticion. Detiene el loading.
    
}) */

const app = http.createServer((req,res) =>{
  console.log('Recibimos una peticion')

  if(req.url === '/miWeb'){
    fs.readFile('./public/miWeb.html')
      .then((data) => {
        console.log('Leímos el archivo con exito')
        res.write(data.toString());
      })
      .catch(() => {
        res.write(`<h1>No se puedo leer el archivo</h1>`);
        // throw Error ('Mensage de Erro' + err.message);
      })
      .finally(()=>{
        res.end();
      })
  }else{
    res.write(`<h1>Archivo ${req.url} no encontrado :C </h1>`);
    res.end();
  }


})

// escuchamos el puerto. 
app.listen(3000, () =>{
  console.log('Nos conectamos al puerto con http:/localhost:3000')
})

