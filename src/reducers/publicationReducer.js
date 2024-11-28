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

export const initializePublications = () => async (dispatch) => {
  try {
    const publications = await publicationService.getAllPublications()
    dispatch(setPublications(publications))
  } catch (error) {
    console.error("Error al inicializar publicaciones:", error)
  }
}

export const createPublication = (publication) => async (dispatch) => {
  const newPublication = await publicationService.createPublication(publication)
  dispatch(addPublication(newPublication))
}

export const likePublication = ({ publication, userId }) => async (dispatch) => {
  try {
    const response = await publicationService.updatePublication(publication.id)
    dispatch(updatePublication(response))
  } catch (error) {
    console.error('Error al dar like:', error)
  }
}


export default publicationSlice.reducer
