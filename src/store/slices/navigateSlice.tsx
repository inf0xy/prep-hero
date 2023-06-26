import { createSlice } from '@reduxjs/toolkit';

interface NavigateState {
  destination: string | undefined;
  savedListOpen: boolean;
}

const initialState: NavigateState = {
  destination: undefined,
  savedListOpen: false
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
    }
  }
});

export const { setNavigateDestination, toggleSavedList } =
  navigateSlice.actions;
export default navigateSlice.reducer;
