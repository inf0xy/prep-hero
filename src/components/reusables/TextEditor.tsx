import { useState, useEffect, useRef, useContext } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';

import { useAppSelector } from '@/hooks/hooks';
import classes from './TextEditor.module.scss';
import PreviewIcon from '../icons/PreviewIcon';
import EditIcon from '../icons/EditIcon';
import XIcon from '../icons/XIcon';

interface TextEditorProps {
  value: string;
  setValue: (val: string) => void;
  onCloseNote: () => void;
  className?: string;
  fullScreen?: boolean;
}

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

const SwitchModeButton = () => {
  const [editorContext, setEditorContext] = useState<any | null>(null);

  useEffect(() => {
    import('@uiw/react-md-editor').then((mod) => {
      const { EditorContext } = mod;
      if (EditorContext) {
        setEditorContext(EditorContext);
      }
    });
  }, []);


  if (editorContext) {
    const { preview, dispatch }: {preview?: any, dispatch?: any } = useContext(editorContext);
    const click = () => {
      dispatch!({
        preview: preview === 'edit' ? 'preview' : 'edit'
      });
    };
    if (preview === 'edit') {
      return (
        <span onClick={click}>
          <PreviewIcon width={15} height={15} />
        </span>
      );
    }
    return (
      <span onClick={click}>
        <EditIcon />
      </span>
    );
  } else {
    return null;
  }
};

const codePreview: any = {
  name: 'preview',
  keyCommand: 'preview',
  value: 'preview',
  icon: <SwitchModeButton />
};

type CloseNoteProps = {
  onCloseNote: () => void;
};

const CloseNoteButton: React.FC<CloseNoteProps> = ({ onCloseNote }) => {
  return (
    <span onClick={onCloseNote} className="ml-4">
      <XIcon height={15} width={15} />
    </span>
  );
};

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  setValue,
  onCloseNote,
  className,
  fullScreen
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div data-color-mode={theme} className={classes.editor}>
      <MDEditor
        itemRef=""
        value={value}
        onChange={setValue as () => void}
        className={`${className} text-editor ${theme}`}
        enableScroll={false}
        fullscreen={fullScreen ? fullScreen : false}
        preview="edit"
        extraCommands={[
          codePreview,
          {
            name: 'preview',
            keyCommand: 'preview',
            value: 'preview',
            icon: <CloseNoteButton onCloseNote={onCloseNote} />
          }
        ]}
      />
    </div>
  );
};

export default TextEditor;
