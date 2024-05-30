import express, { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = express.Router();

// Obtener computadoras filtrando por estado y opcionalmente por sucursal
router.get('/', async (req: Request, res: Response) => {
  const estado = req.query.estado ? String(req.query.estado) : 'Activo';
  const sucursal = req.query.sucursal ? String(req.query.sucursal) : undefined;

  const computadoras = await prisma.computadora2.findMany({
    where: {
      estado: estado,
      ...(sucursal && {
        sucursal: {
          lugar: sucursal,
        },
      }), // Añade el filtro de sucursal si existe
    },
  });
  res.json(computadoras);
});

// Crear una nueva computadora con datos recibidos en el cuerpo de la petición
router.post('/', async (req: Request, res: Response) => {
  const { estado, descripcion, detallesTecnicos, costoPorHoraPrestamo, sucursal } = req.body;

  // Buscar la sucursal
  let sucursalRecord = await prisma.sucursal.findFirst({
    where: { lugar: sucursal },
  });

  // Si no existe, crear la sucursal
  if (!sucursalRecord) {
    sucursalRecord = await prisma.sucursal.create({
      data: { lugar: sucursal },
    });
  }

  const newComputadora = await prisma.computadora2.create({
    data: {
      estado,
      descripcion,
      detallesTecnicos,
      costoPorHoraPrestamo,
      idsucursal: sucursalRecord.idsucursal,
    },
  });
  res.status(201).json(newComputadora);
});

// Obtener una computadora específica por ID
router.get('/:id', async (req: Request, res: Response) => {
  const computadora = await prisma.computadora2.findUnique({
    where: { ID: parseInt(req.params.id) },
  });
  if (computadora) {
    res.json(computadora);
  } else {
    res.status(404).send('Computadora no encontrada');
  }
});

export default router;
