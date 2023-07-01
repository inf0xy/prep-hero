import AuthForm from '@/components/auth/AuthForm';
import ThemeButton from '@/components/reusables/ThemeButton';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setTheme } from '@/store';
import classes from '@/styles/AuthPage.module.scss';

const Auth = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  return (
    <section
      className={`${classes['auth-page']} ${classes[`auth-page--${theme}`]}`}
    >
      <button
        className={classes['auth__theme-button']}
        onClick={() => dispatch(setTheme())}
      >
        <ThemeButton />
      </button>
      <AuthForm />
    </section>
  );
};

export default Auth;
