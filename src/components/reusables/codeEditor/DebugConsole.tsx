import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import classes from './DebugConsole.module.scss';

type DebugConsoleProps = {
  consoleHeight: number;
};

const DebugConsole: React.FC<DebugConsoleProps> = ({ consoleHeight }) => {
  const { theme, debuggingData } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { debuggingData } = state.debugger;
    return { theme, debuggingData };
  });
  const [contentHeight, setContentHeight] = useState(0);
  const codeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (codeRef.current) {
      const contentNodes = Array.from(
        codeRef.current?.childNodes
      ) as HTMLParagraphElement[];
      if (contentNodes.length > 0) {
        let currentContentHeight = contentNodes.reduce(
          (acc, el) => (acc += el.offsetHeight),
          0
        );
        // calculate the total height including all vertical padding - paddingY is 1rem
        currentContentHeight += (contentNodes.length - 1) * 10;
        setContentHeight(currentContentHeight);
      }
    }
  }, [debuggingData.stdOut]);

  let output: string[] = [];
  let hasError = false;
  const errorRegex = /^{"debuggingError":.*}$/g;

  if (errorRegex.exec(debuggingData.stdOut[0])) {
    const debuggingCodeError = JSON.parse(debuggingData.stdOut[0]);
    hasError = true;
    output = [debuggingCodeError.debuggingError];
  } else {
    output = debuggingData.stdOut.slice().map((el: string) =>
      el
        .replace(/"None"/g, JSON.stringify(null))
        .replace(/"True"/g, JSON.stringify(true))
        .replace(/"False"/g, JSON.stringify(false))
    );
    hasError = output.some((el: string) => el.match(/.*Error.*/));
  }

  return (
    <div className={classes['debug-console']}>
      <div
        className={`${classes['debugging__output']} ${
          classes[`debugging__output--${theme}`]
        }`}
      >
        <code
          ref={codeRef}
          className={`${hasError ? classes['debug-error'] : ''}`}
          style={{
            height: contentHeight > consoleHeight - 20 ? 'fit-content' : '100%'
          }}
        >
          {output.map((el, index) => (
            <p key={`${el}${index}`}>{el}</p>
          ))}
        </code>
      </div>
    </div>
  );
};

export default DebugConsole;
