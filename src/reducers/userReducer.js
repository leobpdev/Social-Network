import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import publicationService from '../services/publications'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    "id": 1,
    "username": "testuser",
    "name": "Test User"
  },
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const setUserFromStorage = () => (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedPublicationappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    publicationService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const login = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials)
  window.localStorage.setItem('loggedPublicationappUser', JSON.stringify(user))
  publicationService.setToken(user.token)
  dispatch(setUser(user))
}

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('loggedPublicationappUser')
  dispatch(clearUser())
}

export default userSlice.reducer
