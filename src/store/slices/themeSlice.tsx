import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  theme: string;
}

export const getThemeFromStorage = () => {
  if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('theme');
    return theme ? theme : 'dark';
  }
  return 'dark';
};

const saveThemeToStorage = (theme: string) => {
  localStorage.setItem('theme', theme);
};

const initialState = {
  theme: 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state) {
      if (state.theme === 'light') {
        saveThemeToStorage('dark');
        state.theme = 'dark';
      } else {
        saveThemeToStorage('light');
        state.theme = 'light';
      }
    },
    getTheme(state) {
      const savedTheme = getThemeFromStorage();
      state.theme = savedTheme;
    }
  }
});

export const { setTheme, getTheme } = themeSlice.actions;
export default themeSlice.reducer;
