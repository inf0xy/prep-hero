import AuthForm from '@/components/auth/AuthForm';
import { useAppSelector } from '@/hooks/hooks';
import classes from '@/styles/AuthPage.module.scss';

const Auth = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <section
      className={`${classes['auth-page']} ${classes[`auth-page--${theme}`]}`}
    >
      <AuthForm />
    </section>
  );
};

export default Auth;
