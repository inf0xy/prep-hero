import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import vsDark from 'react-syntax-highlighter/dist/cjs/styles/prism/vs-dark';
import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import { useAppSelector } from '@/hooks/hooks';
import classes from './CodeSnippet.module.scss';

type CodeSnippetProps = {
  value: string;
  language: string;
};

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('python', python);

const CodeSnippet: React.FC<CodeSnippetProps> = ({ value, language }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div
      className={`code-snippet ${theme === 'dark' ? 'dark' : 'light'} ${
        classes['code-snippet-container']
      } ${
        classes[
          `code-snippet-container--${theme === 'dark' ? 'dark' : 'light'}`
        ]
      }`}
      style={{ fontSize: '14px' }}
    >
      <SyntaxHighlighter
        // eslint-disable-next-line react/no-children-prop
        children={value.slice(1, -1).replaceAll('\\n', '\n')}
        // @ts-ignore
        style={theme === 'dark' ? vsDark : prism}
        language={language}
        PreTag="div"
        wrapLongLines={true}
      />
    </div>
  );
};

export default CodeSnippet;
