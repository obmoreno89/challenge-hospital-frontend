import { type InputConfig } from '../types';

export const formCreate: InputConfig[] = [
  {
    name: 'asunto',
    label: 'Asunto',
    type: 'text',
    placeholder: '',
    validation: {
      required: 'El asunto es obligatorio',
      maxLength: {
        value: 40,
      },
    },
  },
  {
    success: 'Ticket Creado',
    name: 'prioridad',
    label: 'Prioridad',
    type: 'select',
    placeholder: 'Selecciona una prioridad',
    options: [
      { value: 1, label: 'Alta' },
      { value: 2, label: 'Media' },
      { value: 3, label: 'Baja' },
    ],
    validation: {
      required: 'La prioridad es obligatorio',
    },
  },

  {
    name: 'detalle',
    label: 'Detalle',
    type: 'textarea',
    placeholder: 'Cuéntanos más detalles sobre el problema...',
    validation: {
      required: 'El detalle es obligatorio',
      maxLength: {
        value: 500,
        message: 'Máximo 500 caracteres',
      },
    },
  },
  {
    name: 'archivo',
    label: 'Adjuntar evidencia (Imagen o PDF)',
    type: 'file',
    placeholder: 'Selecciona un archivo',
    validation: {
      required: 'Debes subir un archivo para continuar',
      validate: {
        acceptedFormats: (files) => {
          const file = files[0];
          if (!file) return true;
          const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/jpg',
            'application/pdf',
          ];
          return (
            allowedTypes.includes(file.type) ||
            'Formato no permitido. Solo JPG, PNG, JPEG o PDF'
          );
        },
        lessThan10MB: (files) => {
          const file = files[0];
          if (!file) return true;
          const maxSize = 10 * 1024 * 1024;
          return (
            file.size <= maxSize ||
            'El archivo es demasiado pesado (máximo 10MB)'
          );
        },
      },
    },
  },
];
