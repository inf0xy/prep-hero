import variables from '@/styles/variables.module.scss';

export const colors: { [key: string]: string } = {
  Easy: '#25b384',
  Medium: '#fbcb06',
  Hard: '#be224c'
};

export const noteStripStyle: { [key: string]: object } = {
  dark: {
    backgroundColor: variables.stripColorDark,
    color: variables.colorGray800,
    fontSize: '1.5rem'
  },
  light: {
    backgroundColor: variables.stripColorLight,
    color: variables.colorOffWhite,
    fontSize: '1.5rem'
  }
};

export const fullNoteStyle = {
  backgroundColor: '#333',
  color: '#ffffffde',
  fontSize: '1.6rem'
};

export const selectedColors = {
  success: '#6fc88d',
  error: '#f6385b',
  warning: '#eea60c'
};

export const statusStyle = {
  opacity: 1,
  visibility: 'visible',
  pointerEvents: 'unset',
}

export const modalBackgroundClear = {
  opacity: '1',
  backgroundColor: '#282828b3'
}

export const modalBackgroundBlur = {
  opacity: '0.8',
  backgroundColor: '#d3e8ff66'
}

export const colorPrimary = {
  50: '#ff7230',
  100: '#e65715',
  200: '#e64900',
  250: '#e64900b5',
  300: '#993507'
}

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
}