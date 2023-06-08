import ResourceCard from '@/components/reusables/ResourceCard';
import { useAppSelector } from '@/hooks/hooks';
import { config } from '@/helpers/config';
import classes from '@/styles/ResourcesPage.module.scss';
import variables from '@/styles/variables.module.scss';

const {
  INTERVIEW_HANDBOOK_URL,
  INTERVIEW_GUIDE,
  FULLSTACK_CAFE_URL,
  NEETCODEIO_URL
} = config;

const ResourcesPage = () => {
  const { theme } = useAppSelector((state) => state.theme);

  const techHandBookResourceContent = (
    <a href={INTERVIEW_HANDBOOK_URL} target="_blank" style={{ width: '21rem' }}>
      Free curated interview preparation materials
    </a>
  );

  const interviewGuideContent = (
    <a href={INTERVIEW_GUIDE} target="_blank">
      Interview Guide
    </a>
  );

  const fullstackCafeContent = (
    <a href={FULLSTACK_CAFE_URL} target="_blank">
      Full Stack Interview Questions
    </a>
  );

  const neetcodeContent = (
    <a href={NEETCODEIO_URL} target="_blank">
      NeetCode IO
    </a>
  );
  return (
    <div
      className={`${classes['resources-page']} ${
        classes[`resources-page--${theme}`]
      }`}
    >
      <ResourceCard
        image="/technterviewhandbookimage.webp"
        imageAlt="Technical Interview Book Image"
        link={INTERVIEW_HANDBOOK_URL}
        content={techHandBookResourceContent}
        backgroundColor={variables.lightBackground0}
      />
      <ResourceCard
        image="/interviewguide.svg"
        imageAlt="Interview Guide Image"
        link={INTERVIEW_GUIDE}
        content={interviewGuideContent}
        backgroundColor={variables.lightBackground0}
        className="translate-y-[2rem]"
      />
      <ResourceCard
        image="/fullstackcafe.webp"
        imageAlt="Fullstack Cafe Image"
        link={FULLSTACK_CAFE_URL}
        content={fullstackCafeContent}
        backgroundColor={variables.colorFullStackCafe}
        className="translate-y-[-1rem]"
      />
      <ResourceCard
        image="/neetcodeio.webp"
        imageAlt="Neetcode IO Image"
        link={NEETCODEIO_URL}
        content={neetcodeContent}
        backgroundColor={variables.colorNeetcode}
      />
    </div>
  );
};

export default ResourcesPage;
