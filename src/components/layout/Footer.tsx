import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './Footer.module.scss';
import InstagramIcon from '../icons/InstagramIcon';
import LinkedinIconOutline from '../icons/LinkedinIconOutline';
import FacebookIcon from '../icons/FacebookIconOutline';
import TwitterIcon from '../icons/TwitterIcon';
import { useAppSelector } from '@/hooks/hooks';

const Footer = () => {
  const router = useRouter();
  const [footerStyle, setFooterStyle] = useState('fixed');
  const { theme } = useAppSelector((state) => state.theme);

  const staticStylePaths = [
    '/admin',
    '/admin/add',
    '/admin/edit',
    '/problems',
    '/notes/add',
    '/admin/tests',
    '/dashboard',
    '/resources'
  ];

  useEffect(() => {
    if (
      router.pathname &&
      staticStylePaths.some((path) => router.pathname.includes(path))
    ) {
      setFooterStyle('static');
    } else {
      setFooterStyle('fixed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <footer
      className={`${classes.footer} ${
        classes[`footer--${theme}`]
      } ${footerStyle}`}
    >
      <div className={classes.disclaimer}>Copyright &copy; 2023 Prep Hero</div>
      <div className={classes.socials}>
        <InstagramIcon theme={theme} width="22px" height="22px" />
        <LinkedinIconOutline theme={theme} width="22px" height="22px" />
        <FacebookIcon theme={theme} width="22px" height="22px" />
        <TwitterIcon theme={theme} width="22px" height="22px" />
      </div>
      <div className={classes.job}>Jobs</div>
      <div>Interview Prep</div>
      <div>Term</div>
      <div>Privacy</div>
    </footer>
  );
};

export default Footer;
