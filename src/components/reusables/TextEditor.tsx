import { useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import DarkIcon from '@/components/icons/DarkIcon';
import LightIcon from '@/components/icons/LightIcon';
import classes from './TextEditor.module.css';
import { modeColors } from '@/helpers/extraStyles';

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
  const [mode, setMode] = useState(defaultMode);

  const currentMode = mode === true ? 'dark' : 'light';

  return (
    <div data-color-mode={currentMode} className={classes['editor-container']}>
      <div
        className={classes['editor-mode']}
        style={{ color: modeColors[currentMode] }}
        onClick={() => setMode((prev) => !prev)}
      >
        {mode ? <LightIcon /> : <DarkIcon />}
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
