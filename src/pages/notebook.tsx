import { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import useSubmitNote from '@/hooks/useSubmitNote';
import { NotificationType, Note } from '@/types/dataTypes';
import TitleList from '@/components/reusables/TitleList';
import Modal from '@/components/reusables/Modal';
import TextEditor from '@/components/reusables/TextEditor';
import EditIcon from '@/components/icons/EditIcon';
import MenuIcon from '@/components/icons/MenuIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import classes from '@/styles/NotebookPage.module.scss';
import variables from '@/styles/variables.module.scss';

const NotebookPage = () => {


  const { theme, notes } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { notes } = state.user;
    return { theme, notes };
  });

  const editorRef = useRef<HTMLDivElement>(null);


  // useEffect(() => {
  //   if (editorRef.current) {
  //     console.log('editor ref ', editorRef.current);
  //   }
  // }, [showNote, editorRef.current]);
// console.log(note);




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
          // titleAction={(val: string) => handleOpenNote(val)}
          // handleCloseNote={handleCloseNote}
          // note={note}
          // showNote={showNote}
          // setNote={}
        />
      </div>

    </div>
  );
};

export default NotebookPage;
