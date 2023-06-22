import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';
import classes from '@/styles/HomePage.module.scss';

const HomePage = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className={`${classes.homepage} ${classes[`homepage--${theme}`]}`}>
      <div className={classes['first-section']}>
        <div className={classes.message}>
          <h2>Practice makes perfect</h2>
          <p>
            Prep Hero is your go-to platform for honing your coding skills and
            acing technical interviews. Whether you are a coding enthusiast or a
            job seeker preparing for interviews, we have the perfect resources
            to help you succeed.
          </p>
        </div>
        <div className={classes['code-editor-image']}>
          <Image
            src="/code-editor-image.png"
            alt="Code Editor Image"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className={classes['second-section']}>
        <div className={classes['chart-image-wrapper']}>
          <div className={classes['chart-image-light']}>
            <span>
              <Image
                src="/analytic-chart-light.jpg"
                alt="Chart Image Light"
                width={400}
                height={400}
              />
            </span>
          </div>
          <div className={classes['chart-image-dark']}>
            <span>
              <Image
                src="/analytic-chart-dark.jpg"
                alt="Chart Image Dark"
                width={400}
                height={400}
              />
            </span>
          </div>
        </div>
        <div className={classes.message}>
          <h2>Performance Analytics</h2>
          <p>
            Track your progress and identify areas for improvement with our
            performance analytics. Get detailed insights into your coding speed,
            accuracy, and efficiency.
          </p>
        </div>
      </div>
      <div className={classes['third-section']}>
        <div className={classes.message}>
          <h2>Interview Preparation Toolkit</h2>
          <p>
          Comprehensive toolkit to help you prepare for technical interviews.
          Access a curated collection of commonly asked interview behavioral questions, and learn effective strategies to tackle coding problems.


          </p>
        </div>
        <div className={classes['resouce-image-wrapper']}>

          <div className={classes['interview-book-image']}>
            <Image
              src="/technterviewhandbookimage.webp"
              alt="Chart Image Dark"
              width={400}
              height={400}
            />
          </div>
          <div className={classes['fullstack-cafe-image']}>
            <Image
              src="/fullstackcafe.webp"
              alt="Chart Image Dark"
              width={400}
              height={400}
            />
          </div>
          <div className={classes['neetcode-io-image']}>
            <Image
              src="/neetcodeio.webp"
              alt="Chart Image Dark"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
