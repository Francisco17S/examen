import express, { Request, Response } from 'express';
import prisma from '../prisma';

const router = express.Router();

// Obtener prestamistas filtrando por estado y opcionalmente por sucursal
router.get('/', async (req: Request, res: Response) => {
  const estado = req.query.estado ? String(req.query.estado) : 'Activo';
  const sucursal = req.query.sucursal ? String(req.query.sucursal) : undefined;

  const prestamistas = await prisma.prestamista2.findMany({
    where: {
      estado: estado,
      ...(sucursal && {
        sucursal: {
          lugar: sucursal,
        },
      }), // Añade el filtro de sucursal si existe
    },
  });
  res.json(prestamistas);
});

// Crear un nuevo prestamista con datos recibidos en el cuerpo de la petición
router.post('/', async (req: Request, res: Response) => {
  const { estado, nombre, identificacion, sucursal } = req.body;

  // Buscar o crear la sucursal
  let sucursalRecord = await prisma.sucursal.findFirst({
    where: { lugar: sucursal },
  });

  if (!sucursalRecord) {
    sucursalRecord = await prisma.sucursal.create({
      data: { lugar: sucursal },
    });
  }

  const newPrestamista = await prisma.prestamista2.create({
    data: {
      estado,
      nombre,
      identificacion,
      idsucursal: sucursalRecord.idsucursal,
    },
  });
  res.status(201).json(newPrestamista);
});

// Obtener un prestamista específico por ID
router.get('/:id', async (req: Request, res: Response) => {
  const prestamista = await prisma.prestamista2.findUnique({
    where: { ID: parseInt(req.params.id) },
  });
  if (prestamista && prestamista.estado !== 'Eliminado') {
    res.json(prestamista);
  } else {
    res.status(404).send('Prestamista no encontrado');
  }
});

export default router;
