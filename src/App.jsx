import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

import PublicationList from './components/PublicationList'
import PublicationForm from './components/PublicationForm'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'

import { initializeLoggedUser, logout } from './reducers/userReducer'

import publicationService from './services/publications'
import userService from './services/users'

const App = () => {
  // useSelector permite seleccionar partes específicas del estado global almacenado en el store de Redux.
  const loggedUser = useSelector((state) => state.user.loggedUser)
  const publications = useSelector((state) => state.publications)
  const userProfile = useSelector((state) => state.user.userProfile)

  // useDispatch es un hook que proporciona acceso al método `dispatch` del store. Este método se utiliza para enviar acciones al store y actualizar el estado global.
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  // Hook que verifica si hay usuario en localStorage al cargar la app
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.token) {
        dispatch(initializeLoggedUser(user))
        publicationService.setToken(user.token)
        userService.setToken(user.token)
      }
    }
    setLoading(false) // Terminamos la carga inicial
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
    publicationService.setToken(null)
  }

  const location = useLocation()

  return (
    <div>
      {loggedUser === null ? (
        <LoginForm />
      ) : (
        <>
          {loading ? (
            <div class="d-flex justify-content-center align-items-center min-vh-100">
              <div class="spinner spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex col-12">
                <div className="d-flex flex-column col-2 sticky-top vh-100 p-3 bg-body-tertiary">
                  <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <span className="fs-4">Social Network</span>
                  </a>
                  <hr />
                  <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                      <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        <i className="bi bi-house-door me-2"></i> Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/search" className={`nav-link ${location.pathname.startsWith('/search') ? 'active' : ''}`}>
                        <i className="bi bi-search me-2"></i> Search
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/messages" className={`nav-link ${location.pathname.startsWith('/messages') ? 'active' : ''}`}>
                        <i className="bi bi-chat me-2"></i> Messages
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/notifications" className={`nav-link ${location.pathname.startsWith('/notifications') ? 'active' : ''}`}>
                        <i className="bi bi-heart me-2"></i> Notifications
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/create" className={`nav-link ${location.pathname.startsWith('/create') ? 'active' : ''}`}>
                        <i className="bi bi-plus-square me-2"></i> Create
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/profile/${loggedUser?.username}`} className={`nav-link ${location.pathname.startsWith('/profile') && loggedUser?.username === userProfile?.username ? 'active' : ''}`}>
                        <i className="bi bi-person-circle me-2"></i> Profile
                      </Link>
                    </li>
                  </ul>
                  <hr />
                  <div className="text-center">
                    <button onClick={handleLogout} className="btn">
                      <i className="bi bi-box-arrow-left"></i> Sign out
                    </button>
                  </div>
                </div>

                <Routes>
                  <Route path="/" element={<PublicationList publications={publications} loggedUser={loggedUser} />} />
                  <Route path="/create" element={<PublicationForm loggedUser={loggedUser} />} />
                  <Route path="/profile/:username" element={<Profile userProfile={userProfile} publications={publications} loggedUser={loggedUser}/>} />
                </Routes>

              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App
