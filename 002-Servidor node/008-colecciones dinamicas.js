// npm install cors
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors()); // Habilitar CORS
/*
// Configurar CORS para permitir solo https://jocarsa.com
app.use(cors({
  origin: 'https://jocarsa.com'
}));
*/

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

app.get('/coleccion/:nombre', async (req, res) => {
  const nombreColeccion = req.params.nombre; // Obtener el nombre de la colección desde la URL
  try {
    await client.connect();
    const database = client.db('empresa');
    const collection = database.collection(nombreColeccion); // Usar el nombre de la colección
    const documentos = await collection.find({}).toArray();
    res.send(documentos);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).send('Error al obtener los documentos');
  } finally {
    await client.close();
  }
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});