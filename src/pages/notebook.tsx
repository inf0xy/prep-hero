import { useAppSelector } from '@/hooks/hooks';
import TitleList from '@/components/reusables/TitleList';
import EditIcon from '@/components/icons/EditIcon';
import MenuIcon from '@/components/icons/MenuIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import classes from '@/styles/NotebookPage.module.scss';
import PlusIcon from '@/components/icons/PlusIcon';

const NotebookPage = () => {
  const { theme, notes } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { notes } = state.user;
    return { theme, notes };
  });

  return (
    <div
      className={`${classes['notebook-page']} ${
        classes[`notebook-page--${theme}`]
      }`}
    >
      <div
        className={`${classes['side-nav']} ${classes[`side-nav--${theme}`]}`}
      >
        <button
          className={`${classes['list-button']} ${
            classes[`list-button--${theme}`]
          }`}
        >
          <MenuIcon width={8} height={8} />
        </button>
        {/* <div className={`dropdown dropdown-bottom ${classes['create-button']}`}>
          <label tabIndex={0}>
            <PlusIcon width={40} height={40}/>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content mt-4 menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div> */}
        <div className={`dropdown ${classes['create-button']}`}>
          <label tabIndex={0}>
            <PlusIcon width={40} height={40} />
            <span>New</span>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content translate-x-[-2rem] mt-6 menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes['note-list']}>
        <TitleList
          listType="notes"
          titles={notes.map((el) => el.title) as string[]}
          firstIconText="Clear"
          secondIconText="Edit"
          firstIcon={<TrashIcon />}
          secondIcon={<EditIcon />}
          firstIconAction={undefined}
          secondIconAction={undefined}
          actionBar={undefined}
        />
      </div>
    </div>
  );
};

export default NotebookPage;
