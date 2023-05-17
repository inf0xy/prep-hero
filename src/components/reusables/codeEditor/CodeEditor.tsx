import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useAppSelector } from '@/hooks/hooks';
import { CodeOptions } from '@/types/dataTypes';
import Loading from '../Loading';

type CodeEditorProps = {
  value: { [key: string]: string };
  options: CodeOptions;
  language: string;
  height: string;
  setCodeInput: Dispatch<SetStateAction<string>>;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  options,
  language,
  height,
  setCodeInput
}) => {
  const { theme } = useAppSelector((state) => state.theme);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (value) {
      setCode(JSON.parse(value[language]));
    } else {
      setCode('');
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleEditorChange = (value: string | undefined) => {
    setCodeInput(value!);
  };

  return (
    <MonacoEditor
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      language={language}
      height={height}
      value={code}
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        renderLineHighlight: 'none',
        quickSuggestions: false,
        renderWhitespace: 'none',
        folding: false,
        lineNumbersMinChars: 3,
        ...options,
      }}
      onChange={handleEditorChange}
      loading={<Loading width={40} height={40}/>}
    />
  );
};

export default CodeEditor;
