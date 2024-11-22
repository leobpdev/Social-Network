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

// Además de los reducers, el slice define thunks (acciones asíncronas) que retornan una función en vez de un objeto de acción típico
export const initializePublications = () => async (dispatch) => {
  const publications = await publicationService.getAllPublications()
  dispatch(setPublications(publications))
}

export const createPublication = (publication) => async (dispatch) => {
  const newPublication = await publicationService.createPublication(publication)
  dispatch(addPublication(newPublication))
}

export const likePublication = ({ publication, userId }) => async (dispatch) => {
  const hasLiked = publication.likes.includes(userId)

  const updatedPublication = {
    ...publication,
    likes: hasLiked
      ? publication.likes.filter((id) => id !== userId) // Si ya dio like, lo elimina (filter)
      : [...publication.likes, userId] // Si no, lo agrega (spread operator)
  }
  const savedPublication = await publicationService.updatePublication(
    publication.id,
    updatedPublication
  )
  dispatch(updatePublication(savedPublication))
}


export default publicationSlice.reducer
