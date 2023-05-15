import { useState } from 'react';
import CodeEditor from '@/components/reusables/codeEditor/CodeEditor';
import { useAppSelector } from '@/hooks/hooks';
import FontSelection from '../reusables/codeEditor/FontSelection';
import classes from './ProblemEditor.module.scss';
import LanguageSelection from '../reusables/codeEditor/LanguageSelection';
import TabSizeSelection from '../reusables/codeEditor/TabSizeSelection';
import SettingsIcon from '../icons/SettingsIcon';
import Modal from '../reusables/Modal';

const defaultValue = `class Solution:\n\tdef twoSum(self, nums: List[int], target: int) -> List[int]:`;

const ProblemEditor = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const [options, setOptions] = useState({ fontSize: 14, tabSize: 4 });
  const [language, setLanguage] = useState('python');
  const [codeInput, setCodeInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div
      className={`${classes['problem-editor']} ${
        classes[`problem-editor--${theme}`]
      }`}
    >
      <div className={classes['editor-menu']}>
        <LanguageSelection setLanguage={setLanguage} />

        <ul className={`${classes.options} ${classes[`options--${theme}`]}`}>
          <li onClick={() => setShowSettings(!showSettings)}>
            <SettingsIcon width="8" height="8" />
          </li>
        </ul>
      </div>
      <div
        className={`${classes['md-editor']} ${classes[`md-editor--${theme}`]}`}
      >
        <CodeEditor
          value={defaultValue}
          options={options}
          language={language}
          setCodeInput={setCodeInput}
        />
      </div>
      <Modal onClose={() => setShowSettings(false)} type="blur">
        <div className={classes.settings}>
          <h1>Settings</h1>
          <div className={classes.font}>
            <div className={classes['font-description']}>
              <p className={classes.title}>Font Size</p>
              <p>Select font size for code editor.</p>
            </div>
            <FontSelection setFont={setOptions} />
          </div>
          <div className={classes.tab}>
            <div className={classes['tab-description']}>
              <p className={classes.title}>Tab Size</p>
              <p>Select tab size for code editor.</p>
            </div>
            <TabSizeSelection setTabSize={setOptions} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProblemEditor;
