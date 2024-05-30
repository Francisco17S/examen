import prisma from './prisma'; // Asegúrate de ajustar la ruta de importación según tu estructura de proyecto

async function cerrarSucursal(idSucursal: number) {
  const closedSucursal = 'closed';

  // Verificar si existe la sucursal "closed"
  let sucursalClosed = await prisma.sucursal.findFirst({
    where: { lugar: closedSucursal },
  });

  // Si no existe, crear la sucursal "closed"
  if (!sucursalClosed) {
    sucursalClosed = await prisma.sucursal.create({
      data: {
        lugar: closedSucursal,
      },
    });
  }

  // Obtener el ID de la sucursal "closed"
  const closedSucursalId = sucursalClosed.idsucursal;

  // Actualizar todas las computadoras de la sucursal
  await prisma.computadora2.updateMany({
    where: { idsucursal: idSucursal },
    data: { idsucursal: closedSucursalId },
  });

  // Actualizar todos los prestamistas de la sucursal
  await prisma.prestamista2.updateMany({
    where: { idsucursal: idSucursal },
    data: { idsucursal: closedSucursalId },
  });

  // Actualizar todos los préstamos de la sucursal
  await prisma.prestamo2.updateMany({
    where: { idsucursal: idSucursal },
    data: { idsucursal: closedSucursalId },
  });

  console.log(`Todos los elementos de la sucursal con ID ${idSucursal} se han movido a la sucursal "${closedSucursal}".`);
}

// Llamada a la función con un ejemplo de ID de sucursal
const idSucursal = 1; // Reemplaza con el ID de la sucursal que deseas cerrar
cerrarSucursal(idSucursal).catch(e => {
  console.error(e);
  prisma.$disconnect();
}).finally(() => {
  prisma.$disconnect();
});
