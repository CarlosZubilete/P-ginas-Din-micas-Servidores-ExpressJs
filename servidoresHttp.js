// importamos el modulo 
import http from 'node:http';
// importamos las promesas  modulo fileSystem
import fs from 'node:fs/promises'

// creamos el seridor , quie va a responde todas las peticiones.
const app = http.createServer((request,response)=>{
  console.log('Recibi una peticion!')

  if(request.url === '/miweb'){
    // fx asincronica, leemos el archivo ... 
      // si usamos utf8 , no usamos toString()
    fs.readFile('miWeb.html')
      .then((data)=>{
        console.log('Leyo con exito')
        response.write(data.toString()) 
      })
      .catch(()=>{
        response.write('Error al intentar leer la pagina')
      })
      .finally(()=>{
        response.end() // Finaliza la peticion.
      })
  }
})

// escuchamos el puerto.
// 'Che pibe, quedate escuchando este puerto'
// Si dos programas escuchan el mismo puero , solo a uno atiende. FIFO
app.listen(3000, () =>{
  console.log('Nos conectamos al puerto con exito!')
})

