import { createSlice } from '@reduxjs/toolkit'
import messageService from '../services/messages'

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages(state, action) {
      return action.payload
    },
    addMessage(state, action) {
      return [...state, action.payload]
    },
  },
})

export const { setMessages, addMessage } = messageSlice.actions

export const initializeMessages = (username) => async (dispatch) => {
  try {
    const messages = await messageService.getAllMessages(username)
    dispatch(setMessages(messages))
  } catch (error) {
    console.error("Error initializing messages:", error)
  }
}

export const createMessage = (username, message) => async (dispatch) => {
  try {
    const newMessage = await messageService.createMessage(username, message)
    dispatch(addMessage(newMessage))
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

export default messageSlice.reducer
