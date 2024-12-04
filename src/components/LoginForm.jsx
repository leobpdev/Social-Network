import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({ username, password }))
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-body-tertiary">
      <form onSubmit={handleLogin} className="d-flex flex-column justify-content-center w-100" style={{ maxWidth: '300px', minHeight: '450px' }}>
        <h3 className="mb-4 fw-normal">Please sign in</h3>
        <div className="mb-1">
          <input
            type="text"
            className="form-control p-3"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Username"
          />
        </div>
        <div className="input-group mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control p-3"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
          />
          <button
            className="btn btn-outline-secondary"  // Botón con estilo para el icono
            type="button"
            id="button-addon"
            onClick={() => setShowPassword(!showPassword)}  // Cambia el estado al hacer clic
          >
            <i className={`bi text-primary ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
          </button>
        </div>
        <button type="submit" className="btn btn-primary w-100 py-2">
          Sign in
        </button>
      </form>
    </div>
  )
}

export default LoginForm
