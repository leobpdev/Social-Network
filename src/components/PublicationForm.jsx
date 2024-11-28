import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPublication } from '../reducers/publicationReducer'

const PublicationForm = (user) => {
  const [newPublication, setNewPublication] = useState('')
  const dispatch = useDispatch()

  const addPublication = (event) => {
    event.preventDefault() // Detiene el comportamiento predeterminado del navegador
    const publicationObject = {
      content: newPublication,
      imageUrl: 'https://stickerly.pstatic.net/sticker_pack/M6DUfwweCC1PPhJ9HOcpw/DAS3U4/19/-806376787.png',
      user: user.id,
      "likes":[]
    }
    dispatch(createPublication(publicationObject))
    setNewPublication('')
  }

  return (
    <div className="container col-md-4 mt-4">
      <form onSubmit={addPublication}>
        <div className="mb-3">
          <label htmlFor="publicationInput" className="form-label">New Publication</label>
          <input
            id="publicationInput"
            className="form-control"
            value={newPublication}
            onChange={(e) => setNewPublication(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  )
}

export default PublicationForm
