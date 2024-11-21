import { useSelector, useDispatch } from 'react-redux'
import { likePublication } from '../reducers/publicationReducer'
import 'bootstrap-icons/font/bootstrap-icons.css'

const PublicationList = () => {
  const publications = useSelector((state) => state.publications) // Obtener las publicaciones desde Redux
  const users = useSelector((state) => state.user.users) // Obtener a los usuarios desde Redux
  const currentUser = useSelector((state) => state.user.loggedUser)
  const dispatch = useDispatch()

  const handleLike = (publication) => {
    dispatch(likePublication({ publication, userId: currentUser.id }))
  }

  return (
    <div className="container col-md-4 mt-4">
      <div className="row">
        {publications.map((publication) => {
          // Encuentra el usuario correspondiente para la publicación
          const user = users.find((u) => u.id === publication.user)
          const hasLiked = publication.likes.includes(currentUser.id)

          return (
            <div className="col-md-12 mb-4" key={publication.id}>
              <div className="d-flex align-items-center mb-2">
                <img
                  src={user.imageUrl || "default-image.jpg"}
                  alt="Foto de perfil"
                  className="rounded-circle me-2"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
                <p className="mb-0">
                  <strong>{user?.name || 'Usuario desconocido'}</strong>
                </p>
              </div>
              <div className="card">
                {publication.imageUrl && (
                  <img
                    src={publication.imageUrl}
                    className="card-img-top"
                    alt="Nota"
                  />
                )}
                <div className="card-body">
                  <p className="card-text">{publication.content}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className={`btn ${hasLiked ? 'text-danger' : 'text-muted'}`}
                      onClick={() => handleLike(publication)}
                    >
                      <i className={`bi ${hasLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </button>
                    <span className="text-muted">
                      {publication.likes.length} {publication.likes.length === 1 ? 'like' : 'likes'}
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
