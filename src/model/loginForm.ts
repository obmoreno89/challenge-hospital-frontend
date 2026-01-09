import { type InputConfig } from '../types/index';

export const formFields: InputConfig[] = [
  {
    titleLanding: 'Hospital Central',
    name: 'correo',
    label: 'Correo Corporativo',
    type: 'text',
    validation: {
      required: 'El correo es obligatorio',
      maxLength: {
        value: 40,
      },
    },
  },
  {
    name: 'contrasena',
    label: 'Contraseña',
    type: 'password',
    validation: {
      required: 'La contraseña es obligatoria',
    },
  },
];
