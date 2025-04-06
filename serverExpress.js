// importamos el modulo de Express.
import express, { response } from 'express'
// modulo path
import path from 'node:path';
// creamos el servidor ...
const app = express();

// Generemoas un midward.. 
app.use('/', express.static('public'));

// atendemos la peticion :  http://localhost:3000
app.get('/' , (request, response) => {
  response.send('Soy una respuesta a la solicitud :) !')
})

// atendemos otra peticion:  http://localhost:3000/about
app.get('/about', (request,response) => {
  response.send(`
      <h1>Esta es la seccion About </h1>
      <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.L</p>
    `)
})

// atendemos a otra peticion, enviando un domumento (necesitamos el modulo path)
// http://localhost:3000/miweb  
/*
app.get('/miweb' , (request,response) => {
  response.sendFile(path.resolve('./miWeb.html'))
})
*/

// escuchamos el puerto
app.listen(3000, () => {
  console.log('Servidor levantado de Express! http://localhost:3000');
})