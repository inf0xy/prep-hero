import AuthForm from '@/components/auth/AuthForm';
import classes from '../../styles/AuthPage.module.css';

const Auth = () => {
  return (
    <section className={classes['auth-page-container']}>
      <AuthForm />
    </section>
  );
};

export default Auth;
