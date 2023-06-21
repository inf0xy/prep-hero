import { useAppSelector } from '@/hooks/hooks';
import classes from './DebugConsole.module.scss';

const DebugConsole = () => {
  const { theme, debuggingData } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { debuggingData } = state.debugger;
    return { theme, debuggingData };
  });

  const output = debuggingData.stdOut.slice().map((el: string) =>
    el
      .replace(/"None"/g, JSON.stringify(null))
      .replace(/"True"/g, JSON.stringify(true))
      .replace(/"False"/g, JSON.stringify(false))
  );

  const hasError = output.some((el: string) => el.match(/.*Error.*/));

  return (
    <div
      className={`${classes['debug-console']} ${
        classes[`debug-console--${theme}`]
      }`}
    >
      <h3>Stdout:</h3>
      <div
        className={`${classes['debugging__output']} ${
          classes[`debugging__output--${theme}`]
        }`}
      >
        <code>
          {output.map((el, index) => (
            <p
              key={`${el}${index}`}
              className={`${hasError ? 'text-red-500' : ''}`}
            >
              {el}
            </p>
          ))}
        </code>
      </div>
    </div>
  );
};

export default DebugConsole;
