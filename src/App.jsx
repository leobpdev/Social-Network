import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import PublicationList from './components/PublicationList'
import PublicationForm from './components/PublicationForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { initializePublications } from './reducers/publicationReducer'
import { initializeUsers, setLoggedUser } from './reducers/userReducer'

import publicationService from './services/publications'

const App = () => {
  // useSelector permite seleccionar partes específicas del estado global almacenado en el store de Redux.
  const loggedUser = useSelector((state) => state.user.loggedUser)
  const publications = useSelector((state) => state.publications)
  const errorMessage = useSelector((state) => state.notification)

  // useDispatch es un hook que proporciona acceso al método `dispatch` del store. Este método se utiliza para enviar acciones al store y actualizar el estado global.
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  // Hook que verifica si hay usuario en localStorage al cargar la app
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.token) {
        dispatch(setLoggedUser(user)) 
        publicationService.setToken(user.token)
      }
    }
    setLoading(false) // Terminamos la carga inicial
  }, [dispatch])

  // Hook que inicializa datos cuando `loggedUser` cambia
  useEffect(() => {
    if (loggedUser) {
      const initializeData = async () => {
        setLoading(true)
        await dispatch(initializeUsers())
        await dispatch(initializePublications())
        setLoading(false)
      }
      initializeData()
    }
  }, [loggedUser, dispatch])

  return (
    <Router>
      <div>
        <Notification message={errorMessage} />
        {loggedUser === null ? (
          <LoginForm />
        ) : (
          
          <div>
            {loading ? (
              <div>Loading...</div> 
            ) : (

              <div>
                <div className="d-flex">
                  <div className="d-flex flex-column position-fixed vh-100 bg-dark text-white" style={{ width: "250px" }}>
                    <h1 className="fs-4 text-center py-3">Social Network</h1>
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <Link to="/" className="nav-link text-white">
                          <i className="bi bi-house-door-fill me-2"></i> Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/" className="nav-link text-white">
                          <i className="bi bi-search me-2"></i> Search
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/" className="nav-link text-white">
                          <i className="bi bi-chat me-2"></i> Messages
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/" className="nav-link text-white">
                          <i className="bi bi-heart me-2"></i> Notifications
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/create" className="nav-link text-white">
                          <i className="bi bi-plus-square me-2"></i> Create
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/" className="nav-link text-white">
                          <i className="bi bi-person-circle me-2"></i> Profile
                        </Link>
                      </li>
                    </ul>
                    <div className="mt-auto py-3 text-center">
                      <Link to="/" className="nav-link text-white">
                        <i className="bi bi-three-dots"></i> More
                      </Link>
                    </div>
                  </div>

                </div>
                <Routes>
                  <Route path="/" element={<PublicationList publications={publications} loggedUser={loggedUser} />} />
                  <Route path="/create" element={<PublicationForm loggedUser={loggedUser} />} />
                </Routes>
              </div>
            )}
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
