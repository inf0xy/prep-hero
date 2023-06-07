import variables from '@/styles/variables.module.scss';

export const getScrollbarStyles = (theme: string) => {
  const scrollbarStyles: any = {
    '--webkit-scrollbar-track': theme === 'dark' ? variables.darkBackground100 : variables.lightBackground100,
    '--webkit-scrollbar-thumb': theme === 'dark' ? variables.colorGray700 : variables.lightBackground200,
    '--webkit-scrollbar-thumb-hover': theme === 'dark' ? variables.colorGray600 : variables.lightBackground300
  };
  return scrollbarStyles;
}

export const colors: { [key: string]: { inner: string; outer: string } } = {
  Easy: {
    inner: variables.colorSuccess500,
    outer: variables.colorProgressEasy
  },
  Medium: {
    inner: variables.colorWarning100,
    outer: variables.colorProgressMedium
  },
  Hard: { inner: variables.colorError400, outer: variables.colorProgressHard }
};

export const noteStripStyle: { [key: string]: object } = {
  dark: {
    backgroundColor: variables.stripColorDark,
    color: variables.colorGray800,
    fontSize: '1.5rem'
  },
  light: {
    backgroundColor: variables.stripColorLight,
    color: variables.colorGray600,
    fontSize: '1.5rem'
  }
};

export const problemDetailStyle: { [key: string]: object } = {
  dark: {
    backgroundColor: variables.darkBackground400,
    color: variables.colorOffWhite,
    fontSize: '1.5rem'
  },
  light: {
    backgroundColor: variables.lightBackground0,
    color: variables.colorGray800,
    fontSize: '1.5rem'
  }
};

export const fullNoteStyle: { [key: string]: object } = {
  dark: {
    backgroundColor: variables.darkBackground50,
    color: variables.colorOffWhite,
    fontSize: '1.6rem'
  },
  light: {
    backgroundColor: variables.lightBackground0,
    color: variables.colorGray800,
    fontSize: '1.6rem'
  }
};

export const selectedColors = {
  success: '#6fc88d',
  error: '#f6385b',
  warning: '#eea60c'
};

export const statusStyle = {
  opacity: 1,
  visibility: 'visible',
  pointerEvents: 'unset'
};

export const modalBackgroundClear = {
  opacity: '1',
  backgroundColor: '#282828b3'
};

export const modalBackgroundBlur = {
  opacity: '0.8',
  backgroundColor: '#d3e8ff66'
};

export const colorPrimary = {
  50: '#ff7230',
  100: '#e65715',
  200: '#e64900',
  250: '#e64900b5',
  300: '#993507'
};

export const grayColors = {
  50: 'hsl(265, 55%, 96%)',
  100: 'hsl(265, 19%, 88%)',
  200: 'hsl(265, 7%, 70%)',
  300: 'hsl(265, 6%, 66%)',
  400: 'hsl(265, 4%, 57%)',
  500: 'hsl(265, 3%, 53%)',
  600: 'hsl(265, 4%, 42%)',
  700: 'hsl(265, 4%, 31%)',
  800: 'hsl(276, 5%, 20%)',
  900: 'hsl(280, 5%, 13%)'
};
