import axios from 'axios'

const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAllUsers = async (profileToken) => {
  const url = profileToken ? `${baseUrl}/${profileToken}` : baseUrl
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAllUsers, setToken }
