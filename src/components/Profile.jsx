import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeUserProfile } from '../reducers/userReducer'
import { initializePublications, likePublication } from '../reducers/publicationReducer'

const Profile = ({ userProfile, publications }) => {
  const dispatch = useDispatch()
  const { username } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (username) {
      const initializeData = async () => {
        setLoading(true) 
        try {
          await dispatch(initializeUserProfile(username))
          await dispatch(initializePublications(username))
        } catch (error) {
        } finally {
          setLoading(false) 
        }
      }
      initializeData() 
    }
  }, [dispatch, username]) 

  const handleLike = (publication) => {
    dispatch(likePublication({ publication }))
  }

  return (
    <div className="container col-10">

      {loading ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (

        <div>
          <div className="d-flex align-items-center bg-white p-4">
            <img
              src={userProfile.imageUrl}
              alt="Profile"
              className="rounded-circle me-4"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <div>
              <h1 className="h4 mb-2">{userProfile.username}</h1>
              <p className="text-muted m-0">{userProfile.name}</p>
              <div className="d-flex mb-2">
                <span className="me-3">
                  <strong>{userProfile.followers.length}</strong> followers
                </span>
                <span className="me-3">
                  <strong>{userProfile.following.length}</strong> following
                </span>
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
      )}
    </div>
  )
}

export default Profile
