import { type FormInputProps } from '../types/index';

export const FormInput = ({
  name,
  label,
  type,
  register,
  error,
  placeholder,
  options,
  validation,
}: FormInputProps) => {
  const baseClasses = `bg-gray-50 border ${
    error ? 'border-red-500' : 'border-gray-300'
  } text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none transition-all`;

  return (
    <div className='w-full mb-4'>
      {type === 'select' && (
        <select
          {...register(name, validation)}
          className={`${baseClasses} cursor-pointer`}
        >
          <option value=''>{placeholder || 'Seleccione una opción'}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {type === 'textarea' && (
        <textarea
          {...register(name, validation)}
          placeholder={placeholder}
          rows={4}
          className={`${baseClasses} resize-none`}
        />
      )}

      {type === 'file' && (
        <div className='flex flex-col gap-2'>
          <label className='block text-sm font-medium text-gray-900 dark:text-white'>
            {label}
          </label>

          <input
            type='file'
            className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-600 hover:file:text-black hover:file:bg-gray-400 cursor-pointer'
            accept='.jpg,.jpeg,.png,.pdf,.csv'
            {...register(name, validation)}
          />
        </div>
      )}

      {['text', 'password', 'email', 'number'].includes(type) && (
        <input
          type={type}
          {...register(name, validation)}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}

      {error && (
        <p className='mt-1 text-xs text-red-500 font-medium'>{error.message}</p>
      )}
    </div>
  );
};
