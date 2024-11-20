import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users' // Asegúrate de importar el servicio que trae los usuarios

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedUser: {
      "id": 1,
      "username": "testuser",
      "name": "Test User",
      "publications": [
        1,
        4
      ]
    },  // Aquí almacenaremos el usuario logueado
    users: [{
      "id": 1,
      "username": "testuser",
      "name": "Test User",
      "publications": [
        1,
        4
      ]
    },
    {
      "id": 2,
      "username": "otheruser",
      "name": "Other User",
      "publications": [
        2,
        3
      ]
    }], // Aquí almacenaremos la lista de todos los usuarios
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
