import express from 'express';
import path from 'node:path';

const app = express();

/* app.get('/', (req,res) =>{
  console.log('Recibimos una petición');
  res.send(`<h1> Soy una repuesta de la solicitud </h1>`)  
}) */

// Creacion de un midward 
app.use('/', express.static('public')); 

/* app.get('/miWeb', (req,res) => {
  res.sendFile(path.resolve('./public/miWeb.html'))
}) */

app.get('/main', (req,res) => {
  console.log('Recibimos una peticion')
  res.sendFile(path.resolve('./main.html'))
})


app.listen(3000 , () => {
  console.log('Nos conectamos al puerto http:/localhost:3000');
  console.log('Un cambio para --watch');
})

/* Servidor web Statico:  
  const app = express();
  app.use('/', express.static('public')); 
  app.listen(3000 , () => )
*/