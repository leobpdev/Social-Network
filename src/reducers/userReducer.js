import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users' 
import publicationService from '../services/publications'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedUser: null,
    users: [],
  },
  reducers: {
    setUser(state, action) {
      state.loggedUser = action.payload
    },
    clearUser(state) {
      state.loggedUser = null
    },
    setUsers(state, action) {
      state.users = action.payload 
    },
  },
})

export const { setUser, clearUser, setUsers } = userSlice.actions

export const initializeUsers = () => async (dispatch) => {
  try {
    const users = await userService.getAllUsers();
    dispatch(setUsers(users));
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
}

export const setLoggedUser = () => (dispatch) => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    dispatch(setUser(user))
  }
}

export const login = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials)
  window.localStorage.setItem('loggedUser', JSON.stringify(user))
  publicationService.setToken(user.token)
  dispatch(setUser(user))
}

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('loggedUser')
  dispatch(clearUser())
}

export default userSlice.reducer
