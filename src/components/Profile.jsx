import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { initializePublications, likePublication } from '../reducers/publicationReducer'

const Profile = ({ userProfile, publications }) => {
  console.log("perfil del usuario", userProfile)
  const dispatch = useDispatch()
  const profileToken = userProfile.token 

  useEffect(() => {
    if (profileToken) {
      dispatch(initializeUsers(profileToken))
      dispatch(initializePublications(profileToken))
    }
  }, [dispatch, profileToken])

  const { username, name, imageUrl, followers, following } = userProfile

  const handleLike = (publication) => {
    dispatch(likePublication({ publication }))
  }

  return (
    <div className="container col-10">
      <div className="d-flex align-items-center bg-white p-4">
        <img
          src={imageUrl}
          alt="Profile"
          className="rounded-circle me-4"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <div>
          <h1 className="h4 mb-2">{username}</h1>
          <p className="text-muted m-0">{name}</p>
          <div className="d-flex mb-2">
            <span className="me-3"><strong>{followers.length}</strong> followers</span>
            <span className="me-3"><strong>{following.length}</strong> following</span>
          </div>
        </div>
      </div>

      <hr />

      <div className="container col-md-4 mt-4">
        <div className="row">
          {publications.map((publication) => {
            const { user, hasLiked } = publication

            return (
              <div className="col-md-12 mb-4" key={publication.id}>
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
    </div>
  )
}

export default Profile
