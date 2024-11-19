import { createSlice } from '@reduxjs/toolkit'
import publicationService from '../services/publications'

const publicationSlice = createSlice({
  name: 'publications',
  initialState: [],
  reducers: {
    setPublications(state, action) {
      return action.payload
    },
    addPublication(state, action) {
      return [...state, action.payload]
    },
    updatePublication(state, action) {
      const updated = action.payload
      return state.map((pub) => (pub.id === updated.id ? updated : pub))
    },
  },
})

export const { setPublications, addPublication, updatePublication } = publicationSlice.actions

export const initializePublications = () => async (dispatch) => {
  const publications = await publicationService.getAllPublications()
  dispatch(setPublications(publications))
}

export const createPublication = (publication) => async (dispatch) => {
  const newPublication = await publicationService.createPublication(publication)
  dispatch(addPublication(newPublication))
}

export const likePublication = (publication) => async (dispatch) => {
  const updatedPublication = {
    ...publication,
    likes: publication.likes + 1,
  }
  const savedPublication = await publicationService.updatePublication(
    publication.id,
    updatedPublication
  )
  dispatch(updatePublication(savedPublication))
}

export default publicationSlice.reducer
