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

const getUser = async (username) => {
  const response = await axios.get(`${baseUrl}/${username}`)
  return response.data
}

export default { getAllUsers, getUser, setToken }
