import { useState, useEffect, useRef, RefObject } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import { loader } from '@monaco-editor/react';
import classes from './CodeSnippet.module.scss';

type CodeSnippetProps = {
  value: string;
  language: string;
};

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  value,
  language
}) => {
  const { theme } = useAppSelector((state) => state.theme);
  const [height, setHeight] = useState('300px');

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMonacoEditor = async () => {
      await loader.init();

      const editor = await loader.init().then((monaco) => {
        return monaco.editor.create(editorRef.current!, {
          theme: theme === 'dark' ? 'vs-dark' : 'light',
          value: JSON.parse(value),
          language,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          readOnly: true,
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          renderLineHighlight: 'none',
          quickSuggestions: false,
          renderWhitespace: 'none',
          folding: false,
          fontSize: 14,
          lineNumbers: 'off',
          glyphMargin: false
        });
      });

      const contentHeight = editor.getContentHeight();
      setHeight(`${contentHeight + 46}px`);
    };

    if (typeof window !== 'undefined') {
      loadMonacoEditor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, height]);

  return (
    <div
      className={`code-snippet ${theme === 'dark' ? 'dark' : 'light'} ${
        classes['code-snippet-container']
      } ${
        classes[
          `code-snippet-container--${theme === 'dark' ? 'dark' : 'light'}`
        ]
      }`}
      style={{ height }}
    >
      <div ref={editorRef} />
    </div>
  );
};

export default CodeSnippet;
