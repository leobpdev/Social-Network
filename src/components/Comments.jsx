import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'
import { initializePublications, likePublication } from '../reducers/publicationReducer'
import { initializeComments, createComment } from '../reducers/commentReducer'

const Comments = ({ users, comments, publications, loggedUser }) => {
  const dispatch = useDispatch()
  const { id } = useParams() // Capturamos el parámetro de la URL
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')

  console.log('comments:', comments)

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true)
      await dispatch(initializeUsers())
      await dispatch(initializePublications())
      await dispatch(initializeComments(id))
      setLoading(false)
    }
    initializeData()
  }, [dispatch, id])

  const publication = publications.find((publication) => publication.id === id)

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row flex-grow-1">
          {publication ? (
            <>
              <div className="col-md-6 d-flex justify-content-center align-items-center border-end">
                <img
                  src={publication.imageUrl}
                  alt="Publication"
                  className="img-fluid"
                />
              </div>

              <div className="col-md-6 d-flex flex-column">
                <div className="p-3 flex-grow-1 overflow-auto">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={publication.user?.imageUrl || ''}
                      alt=""
                      className="rounded-circle me-2"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <p className="mb-0">{publication.user?.username || 'Unknown user'}</p>
                  </div>

                  <hr />

                  {comments && comments.length > 0 ? (
                    comments.map((comment) => {
                      const {user} = comment 
                      return (
                        <div key={comment.id} className="mb-3">
                          <div className="d-flex align-items-center">
                            <img
                              src={user.imageUrl}
                              alt=""
                              className="rounded-circle me-2"
                              style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                            />
                            <p className="mb-0">
                              <strong>{user.username}</strong>
                            </p>
                          </div>
                          <p className="mt-1">{comment.content}</p>
                        </div>
                      )
                    })
                  ) : (
                    <p>No comments yet</p>
                  )}
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    await dispatch(createComment(id, { content: newComment }))
                    setNewComment('')
                  }}
                  className="d-flex p-3 border-top"
                >
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="form-control me-2"
                    placeholder="Write a comment..."
                  />
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-send-fill"></i>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <p className="text-center">Publication not found</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Comments
