import { createSlice } from '@reduxjs/toolkit'

const publicationSlice = createSlice({
  name: 'publications',
  initialState: [],
  reducers: {
    setPublications: (state, action) => {
      return action.payload
    },
    addPublication: (state, action) => {
      state.push(action.payload)
    },
    updateLike: (state, action) => {
      const publication = state.find(pub => pub.id === action.payload.id)
      if (publication) {
        publication.likes = action.payload.likes
      }
    }
  }
})

export const { setPublications, addPublication, updateLike } = publicationSlice.actions
export default publicationSlice.reducer
