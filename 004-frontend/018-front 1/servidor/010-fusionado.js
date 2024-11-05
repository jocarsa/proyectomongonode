// npm install pug cors mongodb
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors()); // To allow all origins
// Uncomment the following to restrict to a specific origin
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
  res.sendFile(__dirname + '/dist/index.html'); // Adjust the path if necessary
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
  const nombreColeccion = req.params.nombre; // Get collection name from URL
  try {
    await client.connect();
    const database = client.db('empresa');
    const collection = database.collection(nombreColeccion); // Use collection name
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
  const nombreColeccion = req.params.coleccion; // Get collection name from URL
  const identificador = req.params.identificador;
  try {
    await client.connect();
    const database = client.db('empresa');
    const collection = database.collection(nombreColeccion); // Use collection name
    const result = await collection.deleteOne({ "_id": new ObjectId(identificador) });
    res.send(result);
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).send('Error al eliminar el documento');
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
