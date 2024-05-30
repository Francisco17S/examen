import express from 'express';
import computadora2Routes from './rutes/computadora2';
import prestamista2Routes from './rutes/prestamista2';
import prestamo2Routes from './rutes/prestamo2';

const app = express();
const port = 3001;

app.use(express.json());

// Ruta básica para la URL raíz
app.get('/', (req, res) => {
  res.send('Bienvenido al servicio REST de prestamo de computadora');
});

app.use('/computadora2', computadora2Routes);
app.use('/prestamista2', prestamista2Routes);
app.use('/prestamo2', prestamo2Routes);

app.listen(port, () => {
  console.log(`Servicio REST escuchando en http://localhost:${port}`);
});