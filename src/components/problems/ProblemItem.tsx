import { Problem } from '@/types/dataTypes';
import VideoIcon from '../icons/VideoIcon';
import Link from 'next/link';
import CheckIcon from '@/components/icons/CheckIcon';
import classes from './ProblemItem.module.css';
import { colors } from '@/helpers/extraStyles';

import EditorPreview from '../reusables/EditorPreview';
import { stripStyle } from '@/helpers/extraStyles';

type ProblemItemProps = {
  problem: Problem;
};

const ProblemItem: React.FC<ProblemItemProps> = ({ problem }) => {
  const {
    title,
    difficulty,
    category,
    companies,
    leetcode_link,
    solution_vid_link
  } = problem;

  const formatCompanies = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  };

  return (
    <>
      <div className={classes.problem}>
        <div className={classes['solved-content']}>
          <CheckIcon width="18" height="18" />
        </div>
        <div className={classes['category-content']}>{category}</div>
        <div className={classes['title-content']}>
          <Link target="_blank" href={leetcode_link}>
            {title}
          </Link>
        </div>
        <div
          className={classes['difficulty-content']}
          style={{ color: colors[difficulty] }}
        >
          {difficulty}
        </div>
        <div className={classes['solution-content']}>
          <Link target="_blank" href={solution_vid_link}>
            <VideoIcon />
          </Link>
        </div>
        <div
          className={`${classes['companies-content']}`}
          data-tooltip={companies.join(', ')}
        >
          {formatCompanies(companies.join(', '), 60)}
        </div>
      </div>
      {/* <div className={classes.note}>
        <div className={classes.strip}></div>
        <EditorPreview value="Add a note" extraStyle={stripStyle} />
      </div> */}
    </>
  );
};

export default ProblemItem;
