import { FormInput } from '../components/index';

interface FormRendererProps {
  fields: any[];
  register: any;
  errors: any;
}

export const FormRenderer = ({
  fields,
  register,
  errors,
}: FormRendererProps) => {
  return (
    <>
      {fields.map((field) => (
        <FormInput
          key={field.name}
          {...field}
          register={register}
          error={errors[field.name]}
        />
      ))}
    </>
  );
};
