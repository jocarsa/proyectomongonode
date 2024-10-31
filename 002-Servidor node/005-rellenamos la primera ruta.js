// npm install express
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);

app.get('/', (req, res) => {
  res.send('Esta es la pagina de inicio');
});

app.get('/colecciones', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('empresa');
    const collections = await database.listCollections().toArray();
    res.send(collections.map(col => col.name));
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).send('Error al obtener las colecciones');
  } finally {
    await client.close();
  }
});



app.get('/coleccion/nombre', (req, res) => {
  res.send('Esta es la pagina de de sobre mi');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});