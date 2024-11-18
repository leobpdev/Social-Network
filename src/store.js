import { configureStore } from '@reduxjs/toolkit'
import publicationReducer from './reducers/publicationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    publications: publicationReducer,
    user: userReducer,
  },
})

export default store
