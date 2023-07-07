import { useContext } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import PreviewIcon from '../icons/PreviewIcon';
import XIcon from '../icons/XIcon';
import classes from './TextEditor.module.scss';
import SplitIcon from '../icons/SplitIcon';
import ExpandIcon from '../icons/ExpandIcon';
import { toggleFullScreen } from '@/store';
import MinimizeIcon from '../icons/MinimizeIcon';
import TextEditIcon from '../icons/TextEditIcon';

interface TextEditorProps {
  value: string;
  setValue: (val: string) => void;
  onCloseNote?: ((val?: string | undefined) => void) | undefined;
  className?: string;
  fullScreen?: boolean;
  previewMode?: 'edit' | 'preview' | undefined;
}

let editorContext: any;
let divider: any;
const MDEditor = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      const { EditorContext, commands } = mod;
      if (EditorContext && commands) {
        editorContext = EditorContext;
        divider = commands.divider;
      }
      return mod.default;
    }),
  { ssr: false }
);

const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

// let editorContext: any;
// let divider: any;
// import('@uiw/react-md-editor').then((mod) => {
//   const { EditorContext, commands } = mod;
//   if (EditorContext && commands) {
//     editorContext = EditorContext;
//     divider = commands.divider;
//   }
// });

const SwitchModeButton = () => {
  const { preview, dispatch }: { preview?: any; dispatch?: any } =
    useContext(editorContext);
  const click = () => {
    dispatch!({
      preview: preview === 'edit' ? 'preview' : 'edit'
    });
  };
  if (preview === 'edit') {
    return (
      <span onClick={click} className="cursor-pointer">
        <PreviewIcon width={15} height={15} />
      </span>
    );
  }
  return (
    <span onClick={click} className="cursor-pointer">
      <TextEditIcon width={14} height={14} />
    </span>
  );
};

const codePreview = {
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
    <span onClick={onCloseNote} className="ml-4 cursor-pointer">
      <XIcon height={15} width={15} />
    </span>
  );
};

const CodeLiveButton = () => {
  const { dispatch }: { dispatch?: any } = useContext(editorContext);
  const click = () => {
    dispatch!({
      preview: 'live'
    });
  };

  return (
    <span onClick={click} className="cursor-pointer">
      <SplitIcon width={15} height={15} />
    </span>
  );
};

const FullScreenButton = () => {
  const { dispatch }: { dispatch?: any } = useContext(editorContext);
  const { showFullScreen } = useAppSelector((state) => state.navigate);
  const appDispatch = useAppDispatch();

  const click = () => {
    if (!showFullScreen) {
      dispatch!({
        fullscreen: true
      });
      appDispatch(toggleFullScreen(true));
    } else {
      dispatch!({
        fullscreen: false
      });
      appDispatch(toggleFullScreen(false));
    }
  };

  return (
    <span onClick={click} className="cursor-pointer">
      {!showFullScreen ? <ExpandIcon /> : <MinimizeIcon />}
    </span>
  );
};

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  setValue,
  onCloseNote,
  className,
  fullScreen,
  previewMode
}) => {
  const { theme } = useAppSelector((state) => state.theme);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isSmallMobile = useMediaQuery({ query: '(max-width: 521px)' });
  const router = useRouter();
  const groupCommandsLargeScreen = [
    {
      name: 'live',
      keyCommand: 'preview',
      value: 'live',
      icon: <CodeLiveButton />
    },
    codePreview,
    divider,
    {
      name: 'fullscreen',
      keyCommand: 'fullscreen',
      value: 'fullscreen',
      icon: <FullScreenButton />
    },
    {
      name: 'preview',
      keyCommand: 'preview',
      value: 'preview',
      icon: <CloseNoteButton onCloseNote={onCloseNote ?? (() => {})} />
    }
  ];

  const groupCommandsTabletScreen = [
    codePreview,
    divider,
    {
      name: 'fullscreen',
      keyCommand: 'fullscreen',
      value: 'fullscreen',
      icon: <FullScreenButton />
    },
    {
      name: 'preview',
      keyCommand: 'preview',
      value: 'preview',
      icon: <CloseNoteButton onCloseNote={onCloseNote ?? (() => {})} />
    }
  ];

  const groupCommandsSmallScreen = [
    codePreview,
    {
      name: 'preview',
      keyCommand: 'preview',
      value: 'preview',
      icon: <CloseNoteButton onCloseNote={onCloseNote ?? (() => {})} />
    }
  ];

  let groupCommands = groupCommandsLargeScreen;

  const getCommands = () => {
    if (isMobile && !router.pathname.includes('/notebook')) {
      groupCommands = groupCommandsSmallScreen;
    }

    if (isMobile && router.pathname.includes('/notebook')) {
      groupCommands = groupCommandsTabletScreen;
    }

    if (isSmallMobile && router.pathname.includes('/notebook')) {
      groupCommands = groupCommandsSmallScreen;
    }

    return groupCommands;
  };

  const fullSreenMode = isSmallMobile ? true : fullScreen ? fullScreen : false;

  return (
    <div data-color-mode={theme} className={classes.editor}>
      <MDEditor
        itemRef=""
        value={value}
        onChange={setValue as () => void}
        className={`${className} text-editor ${theme}`}
        enableScroll={false}
        fullscreen={fullSreenMode}
        preview={previewMode ? previewMode : 'edit'}
        extraCommands={getCommands()}
      />
    </div>
  );
};

export default TextEditor;
