//zona importaciones
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import mongoose from 'mongoose';
import rutas from '/home/a23johanfav/apontejohan/src/router/rutas.mjs';
//Se crea el servidor

const app = express();

const server = http.createServer(app);

app.use(morgan('dev'));
app.use(express.json());
app.use('/api', rutas);
app.set('port', process.env.PORT || 5000);
app.get('/', (req,res) =>{
    res.send('Servidor corriendo');
});

server.listen(app.get('port'),() =>{
    console.log(`Servidor en marcha e el puerto `, app.get('port'));
})