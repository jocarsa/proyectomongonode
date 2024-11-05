const express = require('express');
const https = require('https');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 443;

// Enable CORS
app.use(cors()); // Allow all origins or restrict to a specific one if needed
/*
app.use(cors({
  origin: 'https://jocarsa.com'
}));
*/

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './vistas');
app.use(express.static('public')); // Serve static files from 'public' directory
app.use(express.static('dist')); // Serve Angular built site from 'dist' directory

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Route for the Angular built site
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

// Route to render the Pug template with a parameter
app.get('/admin', (req, res) => {
  res.render('index', {
    mensaje: 'Hola mundo desde node',
    saludo: "Y este es un segundo saludo"
  });
});

// Route to list collections in MongoDB
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

// Route to fetch documents from a specific collection
app.get('/coleccion/:nombre', async (req, res) => {
  const nombreColeccion = req.params.nombre;
  try {
    await client.connect();
    const database = client.db('empresa');
    const collection = database.collection(nombreColeccion);
    const documentos = await collection.find({}).toArray();
    res.send(documentos);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).send('Error al obtener los documentos');
  } finally {
    await client.close();
  }
});

// Route to delete a document by identifier
app.get('/eliminar/:coleccion/:identificador', async (req, res) => {
  const nombreColeccion = req.params.coleccion;
  const identificador = req.params.identificador;
  try {
    await client.connect();
    const database = client.db('empresa');
    const collection = database.collection(nombreColeccion);
    const result = await collection.deleteOne({ "_id": new ObjectId(identificador) });
    res.send(result);
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).send('Error al eliminar el documento');
  } finally {
    await client.close();
  }
});

// Configure HTTPS server
const httpsServer = https.createServer({
  cert: fs.readFileSync('www.jotauve.es_ssl_certificate.cer'),
  key: fs.readFileSync('www.jotauve.es_private_key.key')
}, app);

// Start the HTTPS server
httpsServer.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
