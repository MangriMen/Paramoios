import { createSlice } from '@reduxjs/toolkit';

import { selectUser } from './selectors';

const initialState = { user: { name: '', email: '' } };

export const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export { selectUser };
