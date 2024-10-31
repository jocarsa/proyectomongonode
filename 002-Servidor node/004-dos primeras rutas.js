// npm install express
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Esta es la pagina de inicio');
});

app.get('/colecciones', (req, res) => {
  
});

app.get('/coleccion/nombre', (req, res) => {
  res.send('Esta es la pagina de de sobre mi');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});