import { useState } from 'react';
import CodeEditor from '@/components/reusables/codeEditor/CodeEditor';
import Resizable from '../reusables/Resizable';
import { useAppSelector } from '@/hooks/hooks';
import FontSelection from '../reusables/codeEditor/FontSelection';
import classes from './ProblemEditor.module.scss';
import LanguageSelection from '../reusables/codeEditor/LanguageSelection';
import TabSizeSelection from '../reusables/codeEditor/TabSizeSelection';
import SettingsIcon from '../icons/SettingsIcon';
import Modal from '../reusables/Modal';

import { runCode } from '@/helpers/submission-api-util';
import Button from '../reusables/Button';
import variables from '@/styles/variables.module.scss';

// const defaultValue = `class Solution:\n\tdef twoSum(self, nums: List[int], target: int) -> List[int]:`;
const defaultValue = `print('Hello World!')`;

const ProblemEditor = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const [options, setOptions] = useState({ fontSize: 14, tabSize: 4 });
  const [language, setLanguage] = useState('python');
  const [codeInput, setCodeInput] = useState('');
  const [output, setOutput] = useState(null);

  const handleRunCode = async () => {
    const result = await runCode(codeInput);
    if (typeof result !== 'string') {
      setOutput(result.output);
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
        <div
          className={`${classes['md-editor']} ${
            classes[`md-editor--${theme}`]
          }`}
        >
          <CodeEditor
            value={defaultValue}
            options={options}
            language={language}
            setCodeInput={setCodeInput}
            height="60vh"
          />
        </div>
        <Resizable>
          <div className={classes.console}>
            <div className={classes.output}>
              {output && (
                <>
                  <p>Output:</p>
                  <code>{output}</code>
                </>
              )}
            </div>
          </div>
        </Resizable>
      </div>
      <div className={classes['code-actions']}>
        <Button
          color="gray"
          extraStyle={{ padding: '0 1rem' }}
          // onClick={handleRunCode}
        >
          Console
        </Button>
        <Button
          extraStyle={{
            backgroundColor: variables.colorSuccess500,
            padding: '0 2rem'
          }}
          onClick={handleRunCode}
        >
          Run
        </Button>
      </div>
      <Modal id="modal-settings" className="overflow-visible">
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
