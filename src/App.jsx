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
  const user = useSelector((state) => state.user)
  const errorMessage = useSelector((state) => state.notification)

  useEffect(() => {
    dispatch(setUserFromStorage()) // Recuperamos el usuario logueado desde el almacenamiento
    dispatch(initializeUsers()) // Cargamos todos los usuarios
    dispatch(initializePublications()) // Cargamos todas las publicaciones
  }, [dispatch])

  return (
    <div>
      <h1>Social Network</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>{user.name} logged in</p> {/* ---------------- TENGO QUE CORREGIR AQUI ---------------- */}
          <PublicationForm />
        </div>
      )}
      <PublicationList user={user}/>
    </div>
  )
}

export default App
