import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/hooks';
import InstagramIcon from '../icons/InstagramIcon';
import LinkedinIconOutline from '../icons/LinkedinIconOutline';
import FacebookIcon from '../icons/FacebookIconOutline';
import TwitterIcon from '../icons/TwitterIcon';
import classes from './Footer.module.scss';

const Footer = () => {
  const router = useRouter();
  const [footerStyle, setFooterStyle] = useState('fixed');
  const { theme } = useAppSelector((state) => state.theme);

  const staticStylePaths = [
    '/',
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
      } ${footerStyle} ${
        router.pathname === '/' || router.pathname === '/resources'
          ? classes['in-home-page']
          : ''
      }`}
    >
      <div className={classes.socials}>
        <InstagramIcon theme={theme} width="22px" height="22px" />
        <LinkedinIconOutline theme={theme} width="22px" height="22px" />
        <FacebookIcon theme={theme} width="22px" height="22px" />
        <TwitterIcon theme={theme} width="22px" height="22px" />
      </div>
      <div className={classes.disclaimer}>Copyright &copy; 2023 Prep Hero</div>
      <div className={classes.links}>
        <div className={classes.jobs}>Jobs</div>
        <div className={`${classes.divider} ${classes[`divider--${theme}`]}`}/>
        <div className={classes.term}>Term</div>
        <div className={`${classes.divider} ${classes[`divider--${theme}`]}`}/>
        <div className={classes.privacy}>Privacy</div>
      </div>
    </footer>
  );
};

export default Footer;
