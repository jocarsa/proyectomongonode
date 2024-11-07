const express = require('express');
const https = require('https');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 443;

// Habilitar CORS para permitir solicitudes desde otros dominios
app.use(cors()); // Permitir todas las solicitudes o restringir si es necesario

// Configurar Express para que procese JSON
app.use(express.json());


// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './vistas');
app.use(express.static('public')); // Serve static files from 'public' directory
app.use(express.static('dist')); // Serve Angular built site from 'dist' directory

// Configuración de MongoDB
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Configuración de HTTPS
const httpsServer = https.createServer({
  cert: fs.readFileSync('www.jotauve.es_ssl_certificate.cer'),
  key: fs.readFileSync('www.jotauve.es_private_key.key')
}, app);

// Ruta para la aplicación Angular construida
app.use(express.static('dist')); // Servir archivos estáticos desde 'dist' donde se encuentra la app de Angular
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

// Rutas del servidor

// Route to render the Pug template with a parameter
app.get('/admin', (req, res) => {
  res.render('index', {
    mensaje: 'Hola mundo desde node',
    saludo: "Y este es un segundo saludo"
  });
});

// Ruta para insertar un nuevo pedido
app.post('/insertarPedido', async (req, res) => {
  const { cliente, pedido, lineasdepedido } = req.body;

  if (!cliente || !pedido || !lineasdepedido) {
    return res.status(400).send('Datos incompletos del pedido');
  }

  try {
    await client.connect();
    const database = client.db('empresa');
    const pedidosCollection = database.collection('pedidos');

    const result = await pedidosCollection.insertOne({
      cliente,
      pedido,
      lineasdepedido
    });
    
    res.status(201).send({ mensaje: 'Pedido insertado con éxito', pedidoId: result.insertedId });
  } catch (error) {
    console.error('Error al insertar el pedido:', error);
    res.status(500).send('Error al insertar el pedido');
  } finally {
    await client.close();
  }
});

// Ruta para obtener todas las colecciones de la base de datos
app.get('/colecciones', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('empresa');
    const collections = await database.listCollections().toArray();
    res.send(collections.map(col => col.name));
  } catch (error) {
    console.error('Error al obtener colecciones:', error);
    res.status(500).send('Error al obtener las colecciones');
  } finally {
    await client.close();
  }
});

// Ruta para obtener documentos de una colección específica
app.get('/coleccion/:nombre', async (req, res) => {
  const nombreColeccion = req.params.nombre;
  try {
    await client.connect();
    const database = client.db('empresa');
    const collection = database.collection(nombreColeccion);
    const documentos = await collection.find({}).toArray();
    res.send(documentos);
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).send('Error al obtener los documentos');
  } finally {
    await client.close();
  }
});

// Ruta para eliminar un documento mediante un identificador
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
    console.error('Error al eliminar documento:', error);
    res.status(500).send('Error al eliminar el documento');
  } finally {
    await client.close();
  }
});

// Iniciar el servidor HTTPS
httpsServer.listen(PORT, () => {
  console.log(`Servidor ejecutándose en https://localhost:${PORT}`);
});
