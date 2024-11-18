import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    "id": 1,
    "username": "testuser",
    "name": "Test User"
  },
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    logoutUser: (state) => {
      return null
    }
  }
})

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer
