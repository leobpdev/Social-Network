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
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm />
      ) : (

        <div>
          <div className="d-flex">
            <div className="d-flex flex-column position-fixed vh-100 bg-dark text-white" style={{ width: "250px" }}>
              <h1 className="fs-4 text-center py-3">Social Network</h1>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="bi bi-house-door-fill me-2"></i> Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="bi bi-search me-2"></i> Buscar
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="bi bi-chat me-2"></i> Mensajes
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="bi bi-heart me-2"></i> Notificaciones
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="bi bi-plus-square me-2"></i> Crear
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="bi bi-person-circle me-2"></i> Perfil
                  </a>
                </li>
              </ul>
              <div className="mt-auto py-3 text-center">
                <a href="#" className="nav-link text-white">
                  <i className="bi bi-three-dots"></i> Más
                </a>
              </div>
            </div>

            <PublicationList />
          </div>
          {/*
          <div>
            <div className="d-flex align-items-center">
              <img
                src={currentUser.imageUrl}
                alt="Foto de perfil"
                className="rounded-circle me-2"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
              <p className="mb-0">{user.name}</p>
            </div>
            <PublicationForm />
          </div>
          */}
        </div>
      )}
    </div>
  )
}

export default App
