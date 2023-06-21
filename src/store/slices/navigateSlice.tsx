import { createSlice } from '@reduxjs/toolkit';

interface NavigateState {
  destination: string | undefined;
}

const initialState: NavigateState = {
  destination: undefined
};

const navigateSlice = createSlice({
  name: 'navigate',
  initialState,
  reducers: {
    setNavigateDestination(state, action) {
      state.destination = action.payload;
    }
  }
});

export const { setNavigateDestination } = navigateSlice.actions;
export default navigateSlice.reducer;
