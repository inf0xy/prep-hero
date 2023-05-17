import { useState, useEffect } from 'react';
import CodeEditor from '@/components/reusables/codeEditor/CodeEditor';
import Resizable from '../reusables/Resizable';
import { useAppSelector } from '@/hooks/hooks';
import FontSelection from '../reusables/codeEditor/FontSelection';
import classes from './ProblemEditor.module.scss';
import LanguageSelection from '../reusables/codeEditor/LanguageSelection';
import TabSizeSelection from '../reusables/codeEditor/TabSizeSelection';
import SettingsIcon from '../icons/SettingsIcon';
import Modal from '../reusables/Modal';

import { runCode, submitCode } from '@/helpers/submission-api-util';
import Button from '../reusables/Button';
import variables from '@/styles/variables.module.scss';
import ChevronDown from '../icons/ChevronDown';
import SubmissionResults from './SubmissionResults';
import { SubmissionResult } from '@/types/dataTypes';

type ProblemEditorProps = {
  prompts: { python: string; javascript: string };
  title: string;
};

const ProblemEditor: React.FC<ProblemEditorProps> = ({ prompts, title }) => {
  const { theme } = useAppSelector((state) => state.theme);
  const [options, setOptions] = useState({ fontSize: 14, tabSize: 4 });
  const [language, setLanguage] = useState('python');
  const [codeInput, setCodeInput] = useState('');
  const [output, setOutput] = useState('');
  const [showConsole, setShowConsole] = useState(false);
  const [editorHeight, setEditorHeight] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEditorHeight(`${window.innerHeight - 195}px`);
    }
  }, []);

  const handleRunCode = async () => {
    setShowConsole(true);
    setEditorHeight(`${window.innerHeight - 350}px`);
    const result = await runCode(codeInput);
    if (typeof result !== 'string') {
      setOutput(result.output);
    }
  };

  const handleSubmission = async () => {
    const result = await submitCode(codeInput, language, title);
    setSubmissionResult(result);
  };

  const handleShowConsole = () => {
    if (showConsole) {
      setEditorHeight(`${window.innerHeight - 195}px`);
      setShowConsole(false);
    } else {
      setEditorHeight(`${window.innerHeight - 350}px`);
      setShowConsole(true);
    }
  };

  return (
    <div
      className={`${classes['problem-editor']} ${
        classes[`problem-editor--${theme}`]
      }`}
    >
      <div className={classes['problem-editor__main']}>
        <div className={classes['editor-menu']}>
          <LanguageSelection setLanguage={setLanguage} />
          <ul className={classes.options}>
            <li>
              <label htmlFor="modal-settings" className="cursor-pointer">
                <SettingsIcon width="8" height="8" />
              </label>
            </li>
          </ul>
        </div>
        {editorHeight && (
          <>
            <div
              className={`${classes['md-editor']} ${
                classes[`md-editor--${theme}`]
              }`}
            >
              <CodeEditor
                value={prompts}
                options={options}
                language={language}
                setCodeInput={setCodeInput}
                height={editorHeight}
              />
            </div>
            {showConsole && (
              <Resizable setEditorHeight={setEditorHeight}>
                <div className={classes.console}>
                  <div className={classes.output}>
                    {/* <code
                      className={`${classes.code} ${classes[`code--${theme}`]}`}
                    >
                      {output}
                    </code> */}
                    {submissionResult && (
                      <SubmissionResults testResults={submissionResult} />
                    )}
                  </div>
                </div>
              </Resizable>
            )}
          </>
        )}
      </div>
      <div
        className={`${classes['code-actions']} ${
          classes[`code-actions--${theme}`]
        }`}
      >
        <Button
          extraStyle={{
            padding: '0 1rem',
            backgroundColor: variables.colorGray700
          }}
          onClick={handleShowConsole}
        >
          Console
          <span className="ml-3">
            <ChevronDown
              className={`${showConsole ? classes.down : classes.up}`}
            />
          </span>
        </Button>
        <div className="flex space-x-5">
          <Button
            extraStyle={{
              backgroundColor: variables.colorGray500,
              padding: '0 2rem'
            }}
            onClick={handleRunCode}
          >
            Run
          </Button>
          <Button
            extraStyle={{
              backgroundColor: variables.colorSuccess500,
              padding: '0 2rem'
            }}
            onClick={handleSubmission}
          >
            Submit
          </Button>
        </div>
      </div>
      <Modal
        id="modal-settings"
        type="close-button"
        className="overflow-visible"
      >
        <div className={`${classes.settings} ${classes[`settings--${theme}`]}`}>
          <h1>Settings</h1>
          <div className={classes.font}>
            <div className={classes['font-description']}>
              <p className={`${classes.title} ${classes[`title--${theme}`]}`}>
                Font Size
              </p>
              <p>Select font size for code editor.</p>
            </div>
            <FontSelection options={options} setFont={setOptions} />
          </div>
          <div className={classes.tab}>
            <div className={classes['tab-description']}>
              <p className={`${classes.title} ${classes[`title--${theme}`]}`}>
                Tab Size
              </p>
              <p>Select tab size for code editor.</p>
            </div>
            <TabSizeSelection options={options} setTabSize={setOptions} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProblemEditor;
