import { createSlice } from '@reduxjs/toolkit';

interface NavigateState {
  destination: string | undefined;
  savedListOpen: boolean;
  pageLoading: boolean;
}

const initialState: NavigateState = {
  destination: undefined,
  savedListOpen: false,
  pageLoading: true
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
    }
  }
});

export const { setNavigateDestination, toggleSavedList, setHomePageLoading } =
  navigateSlice.actions;
export default navigateSlice.reducer;
