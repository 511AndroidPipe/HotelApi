import express from 'express';
import mongoose from 'mongoose';
import conexion from './conexion.js';
import cors from 'cors';
import ejs from 'ejs';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';

const app = express();

// 🛡️ Middleware necesario para CORS y JSON
app.use(cors());
app.use(express.json()); // Asegúrate de poder leer JSON en el body

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.engine('ejs', ejs.__express);

// Conexión a la base de datos
mongoose.connect(conexion)
    .then(() => {
        console.log('Conectado a la base de datos');
    })
    .catch((error) => {
        console.log('Error al conectar a la base de datos');
        console.log(error);
    });

// Rutas de la API
app.use(userRoutes);
app.use(serviceRoutes);
app.use(roomRoutes);
app.use(reservationRoutes);

// 👉 Ruta para mostrar documentación
app.get('/', (req, res) => {
    res.render('documentacion');
});

// Arranque del servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
