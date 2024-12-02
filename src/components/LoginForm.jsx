import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form onSubmit={handleLogin} className="bg-light p-5 rounded shadow w-100" style={{ maxWidth: '350px', minHeight: '450px' }}>
        <h3 className="text-center mb-5">Log In</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Username"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Log in
        </button>
      </form>
    </div>
  )
}

export default LoginForm
