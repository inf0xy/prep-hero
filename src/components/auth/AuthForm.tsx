import { useState, useRef, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import classes from './AuthForm.module.css';
import GoogleIcon from '../icons/GoogleIcon';
import GithubIcon from '../icons/GithubIcon';
import FacebookIcon from '../icons/FacebookIcon';
import CircleX from '../icons/CircleX';
import { validateFormData } from '@/helpers/validateFormData';
import { registerUser } from '@/helpers/registerUser';
import Button from '@/components/reusables/Button';

const loginMessage = 'Sign in to you account';
const signupMessage = 'Create your acount';

const AuthForm = () => {
  const { data: session } = useSession();
  const [loginForm, setLoginForm] = useState<null | boolean>(null);
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [notification, setNotification] = useState<null | string>(null);
  const [validation, setValidation] = useState({
    name: true,
    email: true,
    password: true,
    confirmPassword: true
  });
  const [alertStatus, setAlertStatus] = useState<null | 'error' | 'success'>(
    null
  );
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
        message = !loginForm
          ? 'Password must be at least 8 characters and include at least 1 uppercase, 1 lowercase and one of these characters !@#$%^&*.'
          : 'Invalid password.';
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
      setAlertStatus('error');
      setNotification(message);
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
            throw new Error('Cannot create new session.');
          }
        } catch (err: any) {
          console.error(err);
          setAlertStatus('error');
          setNotification('Something went wrong. Please try again.');
        }
      } else {
        const result = await registerUser(name, email, password);
        if (result.message !== 'Success') {
          setAlertStatus('error');
          if (result.message == 'Email existed.') {
            setNotification('Email already exists. Please log in.');
          } else {
            setNotification('Something went wrong. Please try again.');
          }
        } else {
          setAlertStatus('success');
          setNotification(
            'Your account has been successfuly created. Redirecting in 3 seconds...'
          );
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
    <div className={classes['auth-form']}>
      <form onSubmit={handleSubmit}>
        <div className={classes.header}>
          <h1>{loginForm ? loginMessage : signupMessage}</h1>
          <p>
            Or{' '}
            <span>
              {loginForm ? (
                <Link href="/auth/signup">{signupMessage}</Link>
              ) : (
                <Link href="/auth/login">{loginMessage}</Link>
              )}
            </span>
          </p>
        </div>
        {notification && (
          <div
            className={`${classes.notification} ${
              alertStatus === 'error' ? classes.error : classes.success
            }`}
          >
            {notification}
            <button
              onClick={() => {
                setAlertStatus(null);
                setNotification(null);
              }}
            >
              <CircleX />
            </button>
          </div>
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
              className={`${classes.name} ${
                !validation.name ? classes['name-error'] : ''
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
            className={`${classes.email} ${
              !validation.email ? classes['email-error'] : ''
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
              !validation.password ? classes['password-error'] : ''
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
                !validation.confirmPassword
                  ? classes['confirmPassword-error']
                  : ''
              }`}
            />
          )}
        </div>
        <div className={classes['form-actions']}>
          <Button extraStyle={{ width: '100%' }} type="submit">
            {loginForm ? 'Sign in' : 'Register'}
          </Button>
        </div>
      </form>
      <div className={classes['oauth-actions']}>
        <div className={classes.divider}>
          <p className={classes.line}></p>
          <p>Or continue with</p>
          <p className={classes.line}></p>
        </div>
        <div className={classes['oauth-buttons']}>
          <Button
            extraStyle={{ width: '100%', padding: '0.8rem' }}
            color="#3b3b3b"
            onClick={() =>
              signIn('github', { callbackUrl: '/problems', redirect: true })
            }
          >
            <GithubIcon width="18px" height="18px" />
          </Button>
          <Button
            extraStyle={{ width: '100%', padding: '0.8rem' }}
            color="#35b46d"
            onClick={() =>
              signIn('google', { callbackUrl: '/problems', redirect: true })
            }
          >
            <GoogleIcon width="18px" height="18px" />
          </Button>
          <Button
            extraStyle={{ width: '100%', padding: '0.8rem' }}
            color="#2b70c0"
            onClick={() =>
              signIn('facebook', { callbackUrl: '/problems', redirect: true })
            }
          >
            <FacebookIcon width="18px" height="18px" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
