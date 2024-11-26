const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const salasRoutes = require('./routes/salas');
const reservasRoutes = require('./routes/reservas');

app.use('/salas', salasRoutes);
app.use('/reservas', reservasRoutes);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
