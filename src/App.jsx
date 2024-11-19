import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PublicationList from './components/PublicationList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import PublicationForm from './components/PublicationForm'

import { publicationReducer } from './reducers/publicationReducer'
import { userReducer } from './reducers/userReducer'

const App = () => {
  // Usa useDispatch para disparar dos acciones en useEffect al cargar la aplicación
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const errorMessage = useSelector((state) => state.notification)

  useEffect(() => {
    dispatch(userReducer()) // Carga el usuario
    dispatch(publicationReducer()) // Carga todas las publicaciones
  }, [dispatch])

  return (
    <div>
      <h1>Social Network</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <PublicationForm />
        </div>
      )}
      <PublicationList />
    </div>
  )
}

export default App
