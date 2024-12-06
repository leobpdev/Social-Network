import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProfileUser } from '../reducers/userReducer'

const Profile = ({ profileUser }) => {
  console.log("perfil del usuario", profileUser)
  const dispatch = useDispatch()
  const userId = profileUser.token

  useEffect(() => {
    if (userId) {
      dispatch(getProfileUser(userId))
    }
  }, [dispatch, userId])

  const { username, name, imageUrl, followers, following } = profileUser

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
    </div>
  )
}

export default Profile
