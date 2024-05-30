import express, { Request, Response } from 'express';
import prisma from '../prisma';

const router = express.Router();

// Crear un nuevo préstamo con datos recibidos en el cuerpo de la petición
router.post('/', async (req: Request, res: Response) => {
  const { estado, IDcomputadora, IDprestamista, fecha, hora, numeroHorasPrestamo, sucursal } = req.body;
  try {
    const newPrestamo = await prisma.prestamo2.create({
      data: {
        estado,
        IDcomputadora,
        IDprestamista,
        fecha,
        hora,
        numeroHorasPrestamo,
        sucursal,
        computadora: {}, // Proporciona los datos necesarios para computadora
        prestamista: {}, // Proporciona los datos necesarios para prestamista
      },
    });
    res.status(201).json(newPrestamo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el préstamo' });
  }
});

export default router;
