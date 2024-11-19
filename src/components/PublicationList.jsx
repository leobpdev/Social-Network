import { useSelector, useDispatch } from 'react-redux'
import { likePublication } from '../reducers/publicationReducer'

const PublicationList = () => {
  const publications = useSelector((state) => state.publications)
  const dispatch = useDispatch()

  const handleLike = (publication) => {
    dispatch(likePublication(publication))
  }

  return (
    <ul>
      {publications.map((publication) => (
        <li key={publication.id}>
          <div>
            {publication.content}
            <br />
            <img src={publication.imageUrl} alt="Nota" width="100" />
            <br />
            <button onClick={() => handleLike(publication)}>Like</button>
            <br />
            {publication.likes} {publication.likes === 1 ? 'like' : 'likes'}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default PublicationList
