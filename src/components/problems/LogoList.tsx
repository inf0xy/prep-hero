import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import AmazonIcon from '../icons/logos/AmazonIcon';
import AccentureIcon from '../icons/logos/AccentureIcon';
import AmericanExpressIcon from '../icons/logos/AmericanExpressIcon';
import AdobeIcon from '../icons/logos/AdobeIcon';
import AirBnBIcon from '../icons/logos/AirBnBIcon';
import AtlassianIcon from '../icons/logos/AtlassianIcon';
import GoogleIcon from '../icons/logos/GoogleIcon';
import AppleIcon from '../icons/logos/AppleIcon';
import BloombergIcon from '../icons/logos/BloombergIcon';
import CiscoIcon from '../icons/logos/CiscoIcon';
import CoinbaseIcon from '../icons/logos/CoinBaseIcon';
import DoorDashIcon from '../icons/logos/DoorDashIcon';
import eBayIcon from '../icons/logos/eBayIcon';
import ExpediaIcon from '../icons/logos/ExpediaIcon';
import GoldmanSachsIcon from '../icons/logos/GoldmanSachsIcon';
import HuaweiIcon from '../icons/logos/HuaweiIcon';
import IBMIcon from '../icons/logos/IBMIcon';
import IntelIcon from '../icons/logos/IntelIcon';
import InfosysIcon from '../icons/logos/InfosysIcon';
import LinkedInIcon from '../icons/logos/LinkedInIcon';
import LyftIcon from '../icons/logos/LyftIcon';
import MicrosoftIcon from '../icons/logos/MicrosoftIcon';
import MetaIcon from '../icons/logos/MetaIcon';
import NetflixIcon from '../icons/logos/NetflixIcon';
import NvidiaIcon from '../icons/logos/NvidiaIcon';
import OracleIcon from '../icons/logos/OracleIcon';
import PaypalIcon from '../icons/logos/PaypalIcon';
import TeslaIcon from '../icons/logos/TeslaIcon';
import TiktokIcon from '../icons/logos/TiktokIcon';
import TwitterIcon from '../icons/logos/TwitterIcon';
import TwitchIcon from '../icons/logos/TwitchIcon';
import RedditIcon from '../icons/logos/RedditIcon';
import SalesforceIcon from '../icons/logos/SalesforceIcon';
import SamsungIcon from '../icons/logos/SamsungIcon';
import SpotifyIcon from '../icons/logos/SpotifyIcon';
import UberIcon from '../icons/logos/UberIcon';
import VisaIcon from '../icons/logos/VisaIcon';
import VMIcon from '../icons/logos/VMIcon';
import YahooIcon from '../icons/logos/YahooIcon';
import WalmartIcon from '../icons/logos/WalmartIcon';
import classes from './LogoList.module.scss';

const logos: { [key: string]: any } = {
  Accenture: { icon: AccentureIcon, width: 11, height: 11 },
  Amazon: { icon: AmazonIcon, width: 11, height: 11 },
  'American Express': { icon: AmericanExpressIcon, width: 11, height: 11 },
  Adobe: { icon: AdobeIcon, width: 11, height: 11 },
  AirBnB: { icon: AirBnBIcon, width: 11, height: 11 },
  Atlassian: { icon: AtlassianIcon, width: 11, height: 11 },
  Apple: { icon: AppleIcon, width: 13, height: 13 },
  Bloomberg: { icon: BloombergIcon, width: 11, height: 11 },
  Cisco: { icon: CiscoIcon, width: 14, height: 14 },
  Coinbase: { icon: CoinbaseIcon, width: 12, height: 12 },
  DoorDash: { icon: DoorDashIcon, width: 11, height: 11 },
  eBay: { icon: eBayIcon, width: 14, height: 14 },
  Expedia: { icon: ExpediaIcon, width: 14, height: 14 },
  'Goldman Sachs': { icon: GoldmanSachsIcon, width: 14, height: 14 },
  Huawei: { icon: HuaweiIcon, width: 15, height: 15 },
  IBM: { icon: IBMIcon, width: 15, height: 15 },
  Intel: { icon: IntelIcon, width: 14, height: 14 },
  Infosys: { icon: InfosysIcon, width: 15, height: 15 },
  LinkedIn: { icon: LinkedInIcon, width: 12, height: 12 },
  Lyft: { icon: LyftIcon, width: 12, height: 12 },
  Google: { icon: GoogleIcon, width: 13, height: 13 },
  Meta: { icon: MetaIcon, width: 13, height: 13 },
  Microsoft: { icon: MicrosoftIcon, width: 10, height: 10 },
  Netflix: { icon: NetflixIcon, width: 10, height: 10 },
  Nvidia: { icon: NvidiaIcon, width: 10, height: 10 },
  Oracle: { icon: OracleIcon, width: 11, height: 11 },
  Paypal: { icon: PaypalIcon, width: 11, height: 11 },
  Tesla: { icon: TeslaIcon, width: 11, height: 11 },
  TikTok: { icon: TiktokIcon, width: 14, height: 14 },
  Twitter: { icon: TwitterIcon, width: 13, height: 13 },
  Twitch: { icon: TwitchIcon, width: 13, height: 13 },
  Reddit: { icon: RedditIcon, width: 13, height: 13 },
  Salesforce: { icon: SalesforceIcon, width: 12, height: 12 },
  Samsung: { icon: SamsungIcon, width: 14, height: 14 },
  Spotify: { icon: SpotifyIcon, width: 13, height: 13 },
  Uber: { icon: UberIcon, width: 15, height: 15 },
  Visa: { icon: VisaIcon, width: 15, height: 15 },
  VM: { icon: VMIcon, width: 15, height: 15 },
  Yahoo: { icon: YahooIcon, width: 13, height: 13 },
  Walmart: { icon: WalmartIcon, width: 14, height: 14 }
};

type LogoListProps = {
  companyNames: string[];
};

type BrandProps = {
  brand: string;
};

const Logo: React.FC<BrandProps> = ({ brand }) => {
  const Brand = logos[brand].icon;
  return <Brand width={logos[brand].width} height={logos[brand].height} />;
};

const LogoList: React.FC<LogoListProps> = ({ companyNames }) => {
  const [showMore, setShowMore] = useState(false);
  const { theme } = useAppSelector((state) => state.theme);
  const ref = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node) && !moreRef.current?.contains(event.target as Node)) {
      setShowMore(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={classes.logos}>
        {companyNames.slice(0, 3).map((el) => (
          <div
            key={el}
            className={`${classes.brand} ${classes[`brand--${theme}`]}`}
          >
            <span>
              <Logo brand={el === 'Facebook (Meta)' ? 'Meta' : el} />
            </span>
            {el === 'Facebook (Meta)' ? 'Meta' : el}
          </div>
        ))}
        {companyNames.length > 3 && (
          <div
            ref={moreRef}
            className={`${classes.more} ${classes[`brand--${theme}`]}`}
            onClick={() => setShowMore(!showMore)}
          >
            ...
          </div>
        )}
      </div>
      {showMore && (
        <div
          ref={ref}
          className={`${classes['all-companies']} ${
            classes[`all-companies--${theme}`]
          }`}
        >
          {companyNames.slice(3).map((el) => (
            <div
              key={el}
              className={`${classes.brand} ${classes[`brand--${theme}`]}`}
            >
              <span>
                <Logo brand={el === 'Facebook (Meta)' ? 'Meta' : el} />
              </span>
              {el === 'Facebook (Meta)' ? 'Meta' : el}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LogoList;
