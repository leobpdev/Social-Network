import { configureStore } from '@reduxjs/toolkit'
import publicationReducer from './reducers/publicationReducer'
import userReducer from './reducers/userReducer'
//import notificationReducer from './reducers/notificationReducer'

export default configureStore({
  reducer: {
    publications: publicationReducer,
    user: userReducer,
    //notification: notificationReducer,
  },
})
