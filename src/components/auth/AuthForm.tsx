import Head from 'next/head';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import GoogleIcon from '../icons/GoogleIcon';
import GithubIcon from '../icons/GithubIcon';
import FacebookIcon from '../icons/FacebookIcon';
import Button from '@/components/reusables/Button';
import Alert from '../reusables/Alert';
import { useAppSelector } from '@/hooks/hooks';
import { NotificationType } from '@/types/dataTypes';
import { validateFormData } from '@/helpers/validateFormData';
import { registerUser } from '@/helpers/registerUser';
import classes from './AuthForm.module.scss';
import variables from '@/styles/variables.module.scss';

const loginMessage = 'Log In';
const signupMessage = 'Sign Up';

const AuthForm = () => {
  const [loginForm, setLoginForm] = useState<null | boolean>(null);
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>({
    status: undefined,
    message: undefined
  });
  const [validation, setValidation] = useState({
    name: true,
    email: true,
    password: true,
    confirmPassword: true
  });

  const { theme } = useAppSelector((state) => state.theme);
  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    if (slug) {
      const isLogin = slug[0] === 'login' ? true : false;
      setLoginForm(isLogin);
    }
  }, [slug]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let message = '';
    const name = formInput.name.trim();
    const email = formInput.email.trim();
    const password = formInput.password.trim();
    const confirmPassword = formInput.confirmPassword.trim();

    const { validEmail, validPassword, validConfirmPassword } =
      validateFormData(email, password, confirmPassword);

    if (!loginForm && name.length < 3) {
      setValidation((prev) => ({
        ...prev,
        name: false
      }));
      message = 'Name must be at least 3 characters.';
    } else {
      setValidation((prev) => ({
        ...prev,
        name: true
      }));
    }

    if (!validEmail) {
      setValidation((prev) => ({
        ...prev,
        email: false
      }));
      if (message.length === 0) {
        message = 'Please provide valid email.';
      }
    } else {
      setValidation((prev) => ({
        ...prev,
        email: true
      }));
    }

    if (!validPassword) {
      setValidation((prev) => ({
        ...prev,
        password: false
      }));

      if (message.length === 0) {
        if (!loginForm) {
          message =
            'Password must be at least 8 characters and include at least 1 uppercase, 1 lowercase and one of these characters !@#$%^&*.';
        } else {
          message =
            password.length === 0
              ? 'Please provide a password'
              : 'Invalid password.';
        }
      }
    } else {
      setValidation((prev) => ({
        ...prev,
        password: true
      }));
    }

    if (!loginForm && !validConfirmPassword) {
      setValidation((prev) => ({
        ...prev,
        confirmPassword: false
      }));

      if (message.length === 0) {
        message = 'Passwords do not match. Please confirm again.';
      }
    } else {
      setValidation((prev) => ({
        ...prev,
        confirmPassword: true
      }));
    }

    if (!validEmail || !validPassword || !validConfirmPassword) {
      setNotification({ status: 'error', message });
      setShowAlert(true);
    } else {
      if (loginForm) {
        try {
          const result = await signIn('credentials', {
            email,
            password,
            redirect: false
          });
          const newSession = await getSession();
          if (newSession) {
            if (newSession.session.user.account_type === 'admin') {
              router.push('/admin');
            } else if (newSession.session.user.account_type === 'user') {
              router.push('/problems');
            }
          } else {
            throw new Error('Something went wrong. Please try again.');
          }
        } catch (err: any) {
          console.error(err);
          setShowAlert(true);
          setNotification({
            status: 'error',
            message: 'Something went wrong. Please try again.'
          });
        }
      } else {
        const result = await registerUser(name, email, password);
        if (result.message !== 'Success') {
          setShowAlert(true);
          if (result.message == 'Email existed.') {
            setNotification({
              status: 'error',
              message: 'Email already exists. Please log in.'
            });
          } else {
            setNotification({
              status: 'error',
              message: 'Something went wrong. Please try again.'
            });
          }
        } else {
          setShowAlert(true);
          setNotification({
            status: 'success',
            message:
              'Your account has been successfuly created. Redirecting in 3 seconds...'
          });
          await signIn('credentials', {
            email,
            password,
            redirect: false
          });
          setTimeout(() => {
            router.push('/problems');
          }, 3000);
        }
      }
      setFormInput({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <>
      <Head>
        <title>
          {slug ? slug[0].toUpperCase() + slug.slice(1) : 'Authentication'}
        </title>
        <meta
          name="description"
          content={`${slug === 'login' ? 'Login' : 'Sign up'}`}
        />
      </Head>
      <div
        className={`${classes['auth-form']} ${classes[`auth-form--${theme}`]}`}
      >
        <form onSubmit={handleSubmit} className={classes['form-container']}>
          <div
            className={`${classes['header-logo']} ${
              classes[`header-logo--${theme}`]
            }`}
          >
            <Link href="/">
              <Image
                src={
                  theme === 'dark'
                    ? '/prep-hero-logo-dark.png'
                    : '/prep-hero-logo-light.png'
                }
                alt="Prep Hero Icon"
                width={100}
                height={100}
                priority={true}
              />
            </Link>
          </div>
          {showAlert && (
            <Alert
              onClose={setShowAlert}
              setNotification={setNotification}
              status={notification?.status!}
            >
              {notification?.message}
            </Alert>
          )}
          <div className={classes['form-control']}>
            {!loginForm && (
              <input
                value={formInput.name}
                onChange={(e) => {
                  setFormInput((prev) => ({ ...prev, name: e.target.value }));
                  setValidation((prev) => ({ ...prev, name: true }));
                }}
                placeholder="Name"
                className={`${classes.name} ${classes[`name--${theme}`]}${
                  !validation.name
                    ? `${classes['name-error']} ${
                        classes[`name-error--${theme}`]
                      }`
                    : ''
                }`}
              />
            )}
            <input
              value={formInput.email}
              onChange={(e) => {
                setFormInput((prev) => ({ ...prev, email: e.target.value }));
                setValidation((prev) => ({ ...prev, email: true }));
              }}
              placeholder="Email address"
              autoComplete="new-password"
              className={`${classes.email} ${classes[`email--${theme}`]} ${
                !validation.email
                  ? `${classes['email-error']} ${
                      classes[`email-error--${theme}`]
                    }`
                  : ''
              }`}
              style={{
                borderTopLeftRadius: loginForm ? '4px' : 'unset',
                borderTopRightRadius: loginForm ? '4px' : 'unset',
                borderTop: loginForm ? '' : 'unset'
              }}
            />
            <input
              value={formInput.password}
              onChange={(e) => {
                setFormInput((prev) => ({ ...prev, password: e.target.value }));
                setValidation((prev) => ({ ...prev, password: true }));
              }}
              type="password"
              placeholder="Password"
              className={`${classes.password} ${
                classes[`password--${theme}`]
              } ${
                !validation.password
                  ? `${classes['password-error']} ${
                      classes[`password-error--${theme}`]
                    }`
                  : ''
              }`}
              style={{
                borderBottomLeftRadius: loginForm ? '4px' : 'unset',
                borderBottomRightRadius: loginForm ? '4px' : 'unset'
              }}
            />
            {!loginForm && (
              <input
                value={formInput.confirmPassword}
                onChange={(e) => {
                  setFormInput((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value
                  }));
                  setValidation((prev) => ({ ...prev, confirmPassword: true }));
                }}
                type="password"
                placeholder="Confirm Password"
                className={`${classes['confirm-password']} ${
                  classes[`confirm-password--${theme}`]
                } ${
                  !validation.confirmPassword
                    ? `${classes['confirm-password-error']} ${
                        classes[`confirm-password-error--${theme}`]
                      }`
                    : ''
                }`}
              />
            )}
          </div>
          {loginForm && (
            <p
              className={`${classes['forgot-password']} ${
                classes[`forgot-password--${theme}`]
              }`}
            >
              Forgot Password?
            </p>
          )}
          <div className={classes['form-actions']}>
            <Button
              id={`${slug}`}
              extraStyle={{
                width: '100%',
                backgroundColor: variables.colorPrimary200
              }}
              type="submit"
            >
              {loginForm ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>
        <div
          className={`${classes['oauth-actions']} ${
            classes[`oauth-actions--${theme}`]
          }`}
        >
          <div className={classes.divider}>
            <p className={`${classes.line} ${classes[`line--${theme}`]}`}></p>
            <p>OR</p>
            <p className={`${classes.line} ${classes[`line--${theme}`]}`}></p>
          </div>
          <div
            className={`${classes['oauth-buttons']} ${
              classes[`oauth-buttons--${theme}`]
            }`}
          >
            <span
              role="button"
              aria-label="github sign in"
              className={classes.github}
              onClick={() =>
                signIn('github', { callbackUrl: '/problems', redirect: true })
              }
            >
              <GithubIcon width="21px" height="21px" />
            </span>
            <span
              role="button"
              aria-label="google sign in"
              className={classes.google}
              onClick={() =>
                signIn('google', { callbackUrl: '/problems', redirect: true })
              }
            >
              <GoogleIcon width="18px" height="18px" />
            </span>
            <span
              role="button"
              aria-label="facebook sign in"
              className={classes.facebook}
              onClick={() =>
                signIn('facebook', { callbackUrl: '/problems', redirect: true })
              }
            >
              <FacebookIcon width="22px" height="22px" />
            </span>
          </div>
        </div>

        <p className={classes['auth-option']}>
          {loginForm ? `Don't have an acount? ` : 'Have an account? '}
          <span>
            {loginForm ? (
              <Link href="/auth/signup">{signupMessage}</Link>
            ) : (
              <Link href="/auth/login">{loginMessage}</Link>
            )}
          </span>
        </p>
      </div>
    </>
  );
};

export default AuthForm;
