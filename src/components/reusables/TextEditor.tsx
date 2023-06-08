import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';

import { useAppSelector } from '@/hooks/hooks';
import classes from './TextEditor.module.scss';

interface TextEditorProps {
  value: string;
  setValue: (val: string) => void;
  className?: string
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
  className
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div data-color-mode={theme} className={classes.editor}>
      <MDEditor
        itemRef=''
        value={value}
        onChange={setValue as () => void}
        className={`${className} text-editor ${theme}`}
        enableScroll={false}
      />
    </div>
  );
};

export default TextEditor;
