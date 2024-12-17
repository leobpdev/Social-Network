import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializePublications, likePublication } from '../reducers/publicationReducer'
import { initializeUsers } from '../reducers/userReducer'

const PublicationList = ({ publications }) => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  // Hook que inicializa datos cuando `loggedUser` cambia
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true)
      await dispatch(initializeUsers())
      await dispatch(initializePublications())
      setLoading(false)
    }
    initializeData()

  }, [dispatch])

  const handleLike = (publication) => {
    dispatch(likePublication({ publication }))
  }

  return (
    <div className="container col-md-4 mt-4">

      {loading ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (

        <div className="row">
          {publications.map((publication) => {
            const { user, hasLiked } = publication

            return (
              <div className="col-md-12 mb-4" key={publication.id}>
                <div className="d-flex align-items-center mb-2">
                  <a
                    href={`/profile/${user.username}`}
                    className="text-decoration-none d-flex align-items-center"
                  >
                    <img
                      src={user.imageUrl}
                      alt="Foto de perfil"
                      className="rounded-circle me-2"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <p className="mb-0">
                      <strong className="text-dark">{user.name}</strong>
                    </p>
                  </a>
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
      )}
    </div>
  )
}

export default PublicationList