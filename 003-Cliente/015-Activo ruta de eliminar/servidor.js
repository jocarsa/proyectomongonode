// npm install pug
const express = require('express');
const app = express();
const PORT = 3000;

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './vistas');
app.use(express.static('public'));

// Route to render the Pug template with a parameter
app.get('/', (req, res) => {
    res.render('index', { 
        mensaje: 'Hola mundo desde node',
        saludo:"Y este es un segundo saludo"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});