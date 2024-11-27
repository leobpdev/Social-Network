import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import PublicationList from './components/PublicationList'
import PublicationForm from './components/PublicationForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { initializePublications } from './reducers/publicationReducer'
import { initializeUsers, setLoggedUser } from './reducers/userReducer'

const App = () => {
  // useSelector permite seleccionar partes específicas del estado global almacenado en el store de Redux.
  const loggedUser = useSelector((state) => state.user.loggedUser)
  const users = useSelector((state) => state.user.users) 
  const publications = useSelector((state) => state.publications) 
  const errorMessage = useSelector((state) => state.notification)

  // useDispatch es un hook que dlink acceso al método dispatch del store. Este método se uslink parlink enviar acciones al store y actualizar el estado global.
  const dispatch = useDispatch()

  // useEffect es un hook  que te permite sincronizar un componente con un sistemlink externo
  useEffect(() => {
    const initializeData = async () => {
      await dispatch(setLoggedUser())
      await dispatch(initializeUsers())
      dispatch(initializePublications()) // Esto se ejecutará después de cargar usuarios.
    }
    initializeData()
  }, [dispatch])

  return (
    <Router>
      <div>
        <Notification message={errorMessage} />
        {loggedUser === null ? (
          <LoginForm />
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
              <Route path="/" element={<PublicationList publications={publications} loggedUser={loggedUser}/>} />
              <Route path="/create" element={<PublicationForm />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
