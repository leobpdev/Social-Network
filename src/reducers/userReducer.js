import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import publicationService from '../services/publications'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: {
  // Define las funciones (reducers) que actualizan el estado según las acciones que se disparen
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

// funciones son "thunks", que representan acciones asincrónicas o acciones que requieren lógica adicional antes de actualizar el estado
export const initializeUsers = () => async (dispatch) => {
  try {
    const users = await userService.getAllUsers();
    dispatch(setUsers(users));
  } catch (error) {
    console.error("Error loading users:", error);
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
