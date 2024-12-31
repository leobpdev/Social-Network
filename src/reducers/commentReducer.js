import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    addComment(state, action) {
      return [...state, action.payload]
    },
  },
})

export const { setComments, addComment } = commentSlice.actions

export const initializeComments = (id) => async (dispatch) => {
  try {
    const comments = await commentService.getAllComments(id)
    dispatch(setComments(comments))
  } catch (error) {
    console.error("Error initializing comments:", error)
  }
}

export const createComment = (id, comment) => async (dispatch) => {
  try {
    const newComment = await commentService.createComment(id, comment)
    dispatch(addComment(newComment))
  } catch (error) {
    console.error('Error sending comment:', error)
  }
}

export default commentSlice.reducer