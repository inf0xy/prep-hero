import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/hooks';
import classes from '@/styles/HomePage.module.scss';

const HomePage = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/problems');
    }
  }, [router, session]);

  return (
    <div className={`${classes.homepage} ${classes[`homepage--${theme}`]}`}>
      <div className={classes.heading}>
        <h1 className={classes.slogan}>Practice makes perfect</h1>
        <div className={classes.headline}>
          <p>Prep Hero is your go-to platform for honing your coding skills</p>
          <p>and acing technical interviews.</p>
        </div>
        <button className={`${classes.join} ${classes[`join--${theme}`]}`}>
          <Link href="/auth/signup">Create Account</Link>
        </button>
      </div>
      <div
        className={`${classes['first-section']} ${
          classes[`first-section--${theme}`]
        }`}
      >
        <div className={classes.message}>
          <h2>Extensive Coding Challenges</h2>
          <p>
            Explore a vast library of coding challenges that cover a wide range
            of topics and difficulty levels. Improve your problem solving
            skills, and gain confidence in your coding abilities.
          </p>
        </div>
        <div className={classes['code-editor-image']}>
          <div
            className={`${classes['image-wrapper']} ${
              classes[`image-wrapper--${theme}`]
            }`}
          >
            <Image
              src="/code-editor-image.png"
              alt="Code Editor Image"
              width={300}
              height={300}
            />
          </div>
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
            Access a curated collection of commonly asked interview behavioral
            questions, and variety of resources to learn effective strategies to
            tackle coding problems.
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
