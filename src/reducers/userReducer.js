import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users' // Asegúrate de importar el servicio que trae los usuarios

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedUser: {
      "id": 1,
      "username": "mclovin",
      "name": "McLovin",
      "imageUrl": "data:image/jpeg;base64,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",
    },
    users: [], // Aquí almacenaremos la lista de todos los usuarios
  },
  reducers: {
    setUser(state, action) {
      state.loggedUser = action.payload
    },
    clearUser(state) {
      state.loggedUser = null
    },
    setUsers(state, action) {
      state.users = action.payload // Aquí actualizamos la lista de usuarios
    },
  },
})

export const { setUser, clearUser, setUsers } = userSlice.actions

// Acción para cargar los usuarios desde la API
export const initializeUsers = () => async (dispatch) => {
  const users = await userService.getAllUsers()
  dispatch(setUsers(users))
}

export const setUserFromStorage = () => (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedPublicationappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    dispatch(setUser(user))
  }
}

export const login = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials)
  window.localStorage.setItem('loggedPublicationappUser', JSON.stringify(user))
  dispatch(setUser(user))
}

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('loggedPublicationappUser')
  dispatch(clearUser())
}

export default userSlice.reducer
