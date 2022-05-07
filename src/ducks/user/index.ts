import { createSlice } from '@reduxjs/toolkit';

import { getUser } from './selectors';

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

export { getUser };
