import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FormInput } from './index';
import { formFields, formCreate } from '../model/index';
import { ButtonLoading } from './index';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useEffect } from 'react';
import { setFormData } from '../store/slice/formData';

interface FormProps {
  titleButton: string;
  titleModal: string;
  isSuccessSend: boolean;
  onSubmitAction: (data: any) => Promise<void>;
}

export const ModalForm = ({
  titleButton,
  titleModal,
  isSuccessSend,
  onSubmitAction,
}: FormProps) => {
  const { asunto } = useAppSelector((state) => state.formData);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
    defaultValues:
      pathname === '/login'
        ? { correo: 'omar@hospital.com', contrasena: 'Hospital20' }
        : { asunto: asunto, prioridad: '', detalle: '', archivo: null },
  });

  const currentFields = pathname === '/login' ? formFields : formCreate;
  const successMessage = currentFields.map((value) => value.success);
  const title = currentFields.map((value) => value.titleLanding);

  useEffect(() => {
    const subscription = watch((value) => {
      const { archivo, ...datosParaRedux } = value;
      dispatch(setFormData(datosParaRedux));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await onSubmitAction(data);
      setLoading(false);
      reset();
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        setError('root', { type: 'manual', message: error.message });
      } else {
        setError('root', {
          type: 'manual',
          message: 'Ocurrió un error inesperado',
        });
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto w-full md:h-screen lg:py-0 min-h-screen'>
      {title && (
        <>
          <div className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
            {title}
          </div>
        </>
      )}

      <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center'>
            {titleModal}
          </h1>

          <form
            className='space-y-4 md:space-y-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            {currentFields.map((field) => (
              <FormInput
                key={field.name}
                {...field}
                register={register}
                error={errors[field.name]}
              />
            ))}

            {errors.root && (
              <div
                className='p-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400 border border-red-200 dark:border-red-800 text-center font-medium'
                role='alert'
              >
                {errors.root.message}
              </div>
            )}

            {isSuccessSend && (
              <div
                className='p-3 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400 border border-green-200 dark:border-green-800 text-center font-medium'
                role='alert'
              >
                {successMessage}
              </div>
            )}

            {loading ? (
              <ButtonLoading />
            ) : (
              <button
                type='submit'
                className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors cursor-pointer shadow-lg'
              >
                {titleButton}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
