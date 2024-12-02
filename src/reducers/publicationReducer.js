import { createSlice } from '@reduxjs/toolkit'
import publicationService from '../services/publications'

const publicationSlice = createSlice({
  name: 'publications',
  initialState: [],
  // Define las funciones (reducers) que actualizan el estado según las acciones que se disparen
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

// funciones son "thunks", que representan acciones asincrónicas o acciones que requieren lógica adicional antes de actualizar el estado
export const initializePublications = () => async (dispatch) => {
  try {
    const publications = await publicationService.getAllPublications()
    dispatch(setPublications(publications))
  } catch (error) {
    console.error("Error initializing posts:", error)
  }
}

export const createPublication = (publication) => async (dispatch) => {
  try {
    const newPublication = await publicationService.createPublication(publication)
    dispatch(addPublication(newPublication))
  } catch (error) {
    console.error('Error liking the post:', error)
  }
}

export const likePublication = ({ publication }) => async (dispatch) => {
  try {
    const updatedPublication = await publicationService.updatePublication(publication.id)
    dispatch(updatePublication(updatedPublication))
  } catch (error) {
    console.error('Error creating post:', error)
  }
}


export default publicationSlice.reducer
