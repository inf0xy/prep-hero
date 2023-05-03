import { useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import classes from './TextEditor.module.scss';
import { modeColors } from '@/helpers/extraStyles';

import DarkIcon from '../icons/DarkIcon';
import LightIcon from '../icons/LightIcon';
import { useAppSelector } from '@/hooks/hooks';

interface TextEditorProps {
  value: string;
  setValue: (val: string) => void;
  className?: string;
  defaultMode: boolean;
}

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  setValue,
  className,
  defaultMode
}) => {
  const { theme } = useAppSelector((state) => state.theme);
  const [mode, setMode] = useState(theme);

  return (
    <div data-color-mode={mode} className={classes.editor}>
      <div
        className={`${classes['editor__mode-button']} ${
          classes[`editor__mode-button--${mode}`]
        }`}
        onClick={() => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      >
        {mode === 'dark' ? (
          <LightIcon width={19} height={19} />
        ) : (
          <DarkIcon width={19} height={19} />
        )}
      </div>
      <MDEditor
        value={value}
        onChange={setValue as () => void}
        className={`${className} text-editor ${mode}`}
        enableScroll={false}
      />
    </div>
  );
};

export default TextEditor;
