import axios from 'axios'

const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUserById = async (userId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${userId}`, config)
  return response.data
}

export default { getAllUsers, getUserById, setToken }
