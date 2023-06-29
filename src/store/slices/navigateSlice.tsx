import { createSlice } from '@reduxjs/toolkit';

interface NavigateState {
  destination: string | undefined;
  savedListOpen: boolean;
  pageLoading: boolean;
  showUserMenu: boolean;
}

const initialState: NavigateState = {
  destination: undefined,
  savedListOpen: false,
  pageLoading: true,
  showUserMenu: false
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
    }
  }
});

export const {
  setNavigateDestination,
  toggleSavedList,
  setHomePageLoading,
  setShowUserMenu
} = navigateSlice.actions;
export default navigateSlice.reducer;
