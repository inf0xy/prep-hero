import { createSlice } from '@reduxjs/toolkit';

interface NavigateState {
  destination: string | undefined;
  savedListOpen: boolean;
  pageLoading: boolean;
  showUserMenu: boolean;
  showProblemCodeEditor: boolean;
}

const initialState: NavigateState = {
  destination: undefined,
  savedListOpen: false,
  pageLoading: true,
  showUserMenu: false,
  showProblemCodeEditor: false,
};

const navigateSlice = createSlice({
  name: 'navigate',
  initialState,
  reducers: {
    setNavigateDestination(state, action) {
      state.destination = action.payload;
    },
    toggleSavedList(state) {
      state.savedListOpen = !state.savedListOpen;
    },
    setHomePageLoading(state, action) {
      state.pageLoading = action.payload;
    },
    setShowUserMenu(state, action) {
      state.showUserMenu = action.payload;
    },
    setShowProblemCodeEditor(state, action) {
      state.showProblemCodeEditor = action.payload;
    }
  }
});

export const {
  setNavigateDestination,
  toggleSavedList,
  setHomePageLoading,
  setShowUserMenu,
  setShowProblemCodeEditor
} = navigateSlice.actions;
export default navigateSlice.reducer;
