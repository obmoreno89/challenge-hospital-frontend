import { ModalForm } from '../../components/index';
import { useValidateCredentials } from '../../hooks/index';

export const Login = () => {
  const { handleLogin } = useValidateCredentials();

  return (
    <section>
      <ModalForm
        titleButton='Entrar'
        titleModal='Iniciar Sesión'
        onSubmitAction={handleLogin}
      />
    </section>
  );
};
