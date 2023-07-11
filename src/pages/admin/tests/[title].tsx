import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getSingleTest } from '@/lib/database/tests';
import { addTest } from '@/helpers/tests-api-util';
import { NotificationType } from '@/types/dataTypes';
import { useAppSelector } from '@/hooks/hooks';
import CodeEditor from '@/components/reusables/codeEditor/CodeEditor';
import Alert from '@/components/reusables/Alert';
import Button from '@/components/reusables/Button';
import classes from '@/styles/ProblemTestsPage.module.scss';

type ProblemTestsPageProps = {
  test: string | null;
  title: string;
};

const ProblemTestsPage: React.FC<ProblemTestsPageProps> = ({ test, title }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const { theme } = useAppSelector((state) => state.theme);
  const router = useRouter();

  let fetchedPythonTest = {
    tests: { base: '', all: '' },
    testfile: ''
  };
  let fetchedJavascriptTest = {
    tests: { base: '', all: '' },
    testfile: ''
  };

  if (test) {
    const { python, javascript } = JSON.parse(test!);
    if (Object.keys(python).length !== 0)
      fetchedPythonTest = {
        tests: {
          base: python.tests.base,
          all: python.tests.all
        },
        testfile: python.testfile
      };

    if (Object.keys(javascript).length !== 0) {
      fetchedJavascriptTest = {
        tests: {
          base: javascript.tests.base,
          all: javascript.tests.all
        },
        testfile: javascript.testfile
      };
    }
  }

  const [pythonTestFile, setPythonTestFile] = useState(
    fetchedPythonTest!.testfile
  );
  const [pythonTests, setPythonTests] = useState({
    base: fetchedPythonTest.tests.base,
    all: fetchedPythonTest.tests.all
  });
  const [javascriptTestFile, setJavascriptTestFile] = useState(
    fetchedJavascriptTest.testfile
  );
  const [javascriptTests, setJavascriptTests] = useState({
    base: fetchedJavascriptTest.tests.base,
    all: fetchedJavascriptTest.tests.all
  });

  const handleSubmit = async () => {
    const test = {
      title,
      python: {
        tests: {
          base: pythonTests.base,
          all: pythonTests.all
        },
        testfile: pythonTestFile
      },
      javascript: {
        tests: {
          base: javascriptTests.base,
          all: javascriptTests.all
        },
        testfile: javascriptTestFile
      }
    };

    const result = await addTest(test);
    if (typeof result === 'object' && 'error' in result) {
      setShowAlert(true);
      setNotification({ status: 'error', message: result.error });
    } else {
      setShowAlert(true);
      setNotification({ status: 'success', message: 'Success' });
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          status={notification!.status!}
          setNotification={setNotification}
          onClose={() => setShowAlert(false)}
        >
          {notification?.message}
        </Alert>
      )}
      <div
        className={`${classes['problem-tests-page']} ${
          classes[`problem-tests-page--${theme}`]
        }`}
      >
        <div className={classes['python-tests']}>
          <h1>Python</h1>
          <label className={classes.label} style={{ marginBottom: 'unset' }}>
            Test File
          </label>
          <div className={`${classes['editor-wrapper']} ${classes[`editor-wrapper--${theme}`]}`}>
            <CodeEditor
              value={pythonTestFile}
              options={{ fontSize: 14, tabSize: 4 }}
              readOnly={false}
              language="python"
              setCodeInput={setPythonTestFile}
              height="600px"
            />
          </div>
          <div className={classes['test-cases']}>
            <div>
              <label className={classes.label}>Base Testcases</label>
              <div className={`${classes['editor-wrapper']} ${classes[`editor-wrapper--${theme}`]}`}>
                <CodeEditor
                  value={pythonTests.base}
                  options={{ fontSize: 14, tabSize: 4 }}
                  readOnly={false}
                  language="python"
                  setCodeInput={(val: string) =>
                    setPythonTests((prev) => ({
                      ...prev,
                      base: val
                    }))
                  }
                  height="500px"
                />
              </div>
            </div>
            <div>
              <label className={classes.label}>All Testcases</label>
              <div className={`${classes['editor-wrapper']} ${classes[`editor-wrapper--${theme}`]}`}>
                <CodeEditor
                  value={pythonTests.all}
                  options={{ fontSize: 14, tabSize: 4 }}
                  readOnly={false}
                  language="python"
                  setCodeInput={(val: string) =>
                    setPythonTests((prev) => ({
                      ...prev,
                      all: val
                    }))
                  }
                  height="500px"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes['javascript-tests']}>
          <h1>Javascript</h1>
          <label className={classes.label} style={{ marginBottom: 'unset' }}>
            Test File
          </label>
          <div className={`${classes['editor-wrapper']} ${classes[`editor-wrapper--${theme}`]}`}>
            <CodeEditor
              value={javascriptTestFile}
              options={{ fontSize: 14, tabSize: 4 }}
              readOnly={false}
              language="javascript"
              setCodeInput={setJavascriptTestFile}
              height="600px"
            />
          </div>
          <div className={classes['test-cases']}>
            <div>
              <label className={classes.label}>Base Testcases</label>
              <div className={`${classes['editor-wrapper']} ${classes[`editor-wrapper--${theme}`]}`}>
                <CodeEditor
                  value={javascriptTests.base}
                  options={{ fontSize: 14, tabSize: 4 }}
                  readOnly={false}
                  language="javascript"
                  setCodeInput={(val: string) =>
                    setJavascriptTests((prev) => ({
                      ...prev,
                      base: val
                    }))
                  }
                  height="500px"
                />
              </div>
            </div>
            <div>
              <label className={classes.label}>All Testcases</label>
              <div className={`${classes['editor-wrapper']} ${classes[`editor-wrapper--${theme}`]}`}>
                <CodeEditor
                  value={javascriptTests.all}
                  options={{ fontSize: 14, tabSize: 4 }}
                  readOnly={false}
                  language="javascript"
                  setCodeInput={(val: string) =>
                    setJavascriptTests((prev) => ({
                      ...prev,
                      all: val
                    }))
                  }
                  height="500px"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes['action-buttons']}>
          <Button
            color="gray"
            className="self-center"
            extraStyle={{ padding: '1rem 4.6rem' }}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Button
            className="self-center"
            extraStyle={{ padding: '1rem 4rem' }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const title = context.params!.title;

  const test = await getSingleTest(title as string);

  return {
    props: {
      test: test ? JSON.stringify(test) : null,
      title
    }
  };
};

export default ProblemTestsPage;
