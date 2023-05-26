import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';

import { useAppSelector } from '@/hooks/hooks';
import DarkIcon from '../icons/DarkIcon';
import LightIcon from '../icons/LightIcon';
import classes from './TextEditor.module.scss';

interface TextEditorProps {
  value: string;
  setValue: (val: string) => void;
  className?: string;
  // changeMode?: boolean;
}

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

// const defaultProps = {
//   changeMode: true
// };

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  setValue,
  className,
  // changeMode
}) => {
  const { theme } = useAppSelector((state) => state.theme);
  // const [mode, setMode] = useState(theme);

  return (
    <div data-color-mode={theme} className={classes.editor}>
      {/* {changeMode && (
        <div
          className={`${classes['editor__mode-button']} ${
            classes[`editor__mode-button--${mode}`]
          }`}
          onClick={() =>
            setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
          }
        >
          {mode === 'dark' ? (
            <LightIcon width={19} height={19} />
          ) : (
            <DarkIcon width={19} height={19} />
          )}
        </div>
      )} */}
      <MDEditor
        value={value}
        onChange={setValue as () => void}
        className={`${className} text-editor ${theme}`}
        enableScroll={false}
      />
    </div>
  );
};

// TextEditor.defaultProps = defaultProps;

export default TextEditor;
