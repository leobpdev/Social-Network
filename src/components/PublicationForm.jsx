import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPublication } from '../reducers/publicationReducer'

const PublicationForm = () => {
  const [newPublication, setNewPublication] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const addPublication = (event) => {
    event.preventDefault()
    const publicationObject = {
      content: newPublication,
      imageUrl: 'https://stickerly.pstatic.net/sticker_pack/M6DUfwweCC1PPhJ9HOcpw/DAS3U4/19/-806376787.png',
      likes: 0,
      user: user.id,
    }
    dispatch(createPublication(publicationObject))
    setNewPublication('')
  }

  return (
    <form onSubmit={addPublication}>
      <input
        value={newPublication}
        onChange={(e) => setNewPublication(e.target.value)}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default PublicationForm