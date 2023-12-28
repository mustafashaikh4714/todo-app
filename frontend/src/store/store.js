// store.js

import { configureStore, createSlice } from '@reduxjs/toolkit'

// Create a user slice
const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    }
  }
})

// Create a root reducer
const rootReducer = {
  user: userSlice.reducer
}

// Create a persisted reducer

// Create the Redux store
const store = configureStore({
  reducer: rootReducer
})

// Create a persistor

export const { setUser, clearUser } = userSlice.actions
export { store }
