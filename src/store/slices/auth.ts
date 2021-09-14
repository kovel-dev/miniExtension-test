import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: [],
  errorMessage: '',
  studentName: '',
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.errorMessage = '';
    },

    // SET USER DATA
    login(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },

    // LOGOUT
    logout(state) {
      state.isAuthenticated = false;
      state.user = [];
    },

    // ERRORS
    showErrors(state, action) {
      state.errorMessage = action.payload.errorMessage;
    },

    // HANDLE INPUT CHANGE
    updateInputActions(state, action) {
      state.studentName = action.payload.studentName;
      state.errorMessage = '';
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
