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
    profileUser: null,
  },
  reducers: {
    setloggedUser(state, action) {
      state.loggedUser = action.payload
    },
    clearloggedUser(state) {
      state.loggedUser = null
    },
    setUsers(state, action) {
      state.users = action.payload
    },
    setProfileUser(state, action) {
      state.profileUser = action.payload
    },
  },
})

export const { setloggedUser, clearloggedUser, setUsers, setProfileUser } = userSlice.actions

// funciones son "thunks", que representan acciones asincrónicas o acciones que requieren lógica adicional antes de actualizar el estado
export const initializeUsers = () => async (dispatch) => {
  try {
    const users = await userService.getAllUsers();
    dispatch(setUsers(users));
  } catch (error) {
    console.error("Error loading users:", error);
  }
}

export const initializeLoggerdUser = () => (dispatch) => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  if (loggedUser) {
    const user = JSON.parse(loggedUser)
    dispatch(setloggedUser(user))
  }
}

export const getProfileUser = (userId) => async (dispatch) => {
  try {
    const user = await userService.getUserById(userId)
    dispatch(setProfileUser(user))
  } catch (error) {
    console.error('Error fetching profile:', error)
  }
}

export const login = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials)
  window.localStorage.setItem('loggedUser', JSON.stringify(user))
  publicationService.setToken(user.token)
  dispatch(setloggedUser(user))
}

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('loggedUser')
  dispatch(clearloggedUser())
}

export default userSlice.reducer
