import { useSelector, useDispatch } from 'react-redux'
import { likePublication } from '../reducers/publicationReducer'
import 'bootstrap-icons/font/bootstrap-icons.css';

const PublicationList = () => {
  const publications = useSelector((state) => state.publications) // Obtener las publicaciones desde Redux
  const users = useSelector((state) => state.user.users) // Obtener a los usuarios desde Redux
  const dispatch = useDispatch()

  const handleLike = (publication) => {
    dispatch(likePublication(publication))
  }

  return (
    <div className="container col-md-6 mt-4">
      <div className="row">
        {publications.map((publication) => {
          const user = users.find((user) => user.id === publication.user) // Buscar el usuario que creó la publicación utilizando el ID de usuario

          return (
            <div className="col-md-12 mb-4" key={publication.id}>
              <p><strong>{user ? user.username : 'Usuario no encontrado'}</strong></p>
              
              <div className="card">
                {publication.imageUrl && (
                  <img src={publication.imageUrl} className="card-img-top" alt="Nota" />
                )}
                <div className="card-body">
                  <p className="card-text">{publication.content}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button 
                      className="btn" 
                      onClick={() => handleLike(publication)}
                      style={{ color: publication.liked ? 'red' : 'gray' }}
                    >
                      <i className={`bi bi-heart${publication.liked ? '-fill' : ''}`}></i>
                    </button>
                    <span className="text-muted">
                      {publication.likes} {publication.likes === 1 ? 'like' : 'likes'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PublicationList
