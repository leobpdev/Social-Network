import { configureStore } from '@reduxjs/toolkit'
import publicationReducer from './reducers/publicationReducer'
import userReducer from './reducers/userReducer'
import messagesReducer from './reducers/messageReducer'
import commentsReducer from './reducers/commentReducer'

export default configureStore({
  reducer: {
    publications: publicationReducer,
    user: userReducer,
    messages: messagesReducer,
    comments: commentsReducer,
  },
})
