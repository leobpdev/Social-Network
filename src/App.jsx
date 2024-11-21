import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PublicationList from './components/PublicationList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import PublicationForm from './components/PublicationForm'

import { initializePublications } from './reducers/publicationReducer'
import { initializeUsers, setUserFromStorage } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.loggedUser)
  const errorMessage = useSelector((state) => state.notification)

  useEffect(() => {
    dispatch(setUserFromStorage()) // Recuperamos el usuario logueado desde el almacenamiento
    dispatch(initializeUsers())
    dispatch(initializePublications())

  }, [dispatch])

  return (
    <div>
      <h1>Social Network</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <div className="d-flex align-items-center">
            <img
              src={user.imageUrl || "default-image.jpg"}
              alt="Foto de perfil"
              className="rounded-circle me-2"
              style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
            <p className="mb-0">{user.name}</p>
          </div>
          <PublicationForm />
        </div>
      )}
      <PublicationList />
    </div>
  )
}

export default App
