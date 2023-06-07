import ResourceCard from '@/components/reusables/ResourceCard';
import { useAppSelector } from '@/hooks/hooks';
import classes from '@/styles/ResourcesPage.module.scss';
import variables from '@/styles/variables.module.scss';

const ResourcesPage = () => {
  const { theme } = useAppSelector((state) => state.theme);

  const techHandBookResourceContent = (
    <a
      href="https://www.techinterviewhandbook.org/"
      target="_blank"
      style={{ width: '21rem' }}
    >
      Free curated interview preparation materials
    </a>
  );

  const interviewGuideContent = (
    <a href="https://interviewguide.dev/" target="_blank">
      Interview Guide
    </a>
  );

  const fullstackCafeContent = (
    <a href="https://www.fullstack.cafe/" target="_blank">
      Full Stack Interview Questions
    </a>
  );

  const neetcodeContent = (
    <a href="https://neetcode.io/" target="_blank">
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
        link="https://www.techinterviewhandbook.org/"
        content={techHandBookResourceContent}
        backgroundColor={variables.lightBackground0}
      />
      <ResourceCard
        image="/interviewguide.svg"
        imageAlt="Interview Guide Image"
        link="https://interviewguide.dev/"
        content={interviewGuideContent}
        backgroundColor={variables.lightBackground0}
        className="translate-y-[2rem]"
      />
      <ResourceCard
        image="/fullstackcafe.webp"
        imageAlt="Fullstack Cafe Image"
        link="https://www.fullstack.cafe/"
        content={fullstackCafeContent}
        backgroundColor={variables.colorFullStackCafe}
        className="translate-y-[-1rem]"
      />
      <ResourceCard
        image="/neetcodeio.webp"
        imageAlt="Neetcode IO Image"
        link="https://neetcode.io/"
        content={neetcodeContent}
        backgroundColor={variables.colorNeetcode}
      />
    </div>
  );
};

export default ResourcesPage;
