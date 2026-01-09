export const statusTicket = [
  { id: 1, name: 'Abierto' },
  { id: 2, name: 'En proceso' },
  { id: 3, name: 'Resuelto' },
  { id: 4, name: 'Cerrado' },
];

export const priority = [
  { id: 1, name: 'Alta' },
  { id: 2, name: 'Media' },
  { id: 3, name: 'Baja' },
];
export const statusStyles: Record<number, string> = {
  1: 'bg-green-500',
  2: 'bg-blue-500',
  3: 'bg-orange-500',
  4: 'bg-red-500',
};
