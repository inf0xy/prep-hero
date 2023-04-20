import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './Footer.module.css';
import InstagramIcon from '../icons/InstagramIcon';
import LinkedinIconOutline from '../icons/LinkedinIconOutline';
import FacebookIcon from '../icons/FacebookIconOutline';
import TwitterIcon from '../icons/TwitterIcon';

const Footer = () => {
  const router = useRouter();
  const [footerStyle, setFooterStyle] = useState('fixed')

  useEffect(() => {
    if (router.pathname === '/admin/add') {
      setFooterStyle('static');
    } else {
      setFooterStyle('fixed');
    }
  }, [router.pathname]);

  return (
    <footer className={`${classes.footer} ${footerStyle}`}>
      <div className={classes.disclaimer}>Copyright &copy; 2023 Prep Hero</div>
      <div className={classes.socials}>
        <InstagramIcon width='22px' height='22px'/>
        <LinkedinIconOutline width='22px' height='22px' />
        <FacebookIcon width='22px' height='22px'/>
        <TwitterIcon width='22px' height='22px' />
      </div>
      <div className={classes.job}>Jobs</div>
      <div>Interview Prep</div>
      <div>Term</div>
      <div>Privacy</div>
    </footer>
  );
};

export default Footer;
