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
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${username}`, config)
  return response.data
}

const updateUser = async (username, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.put(`${baseUrl}/${username}`, newObject, config)
    return response.data
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

export default { getAllUsers, getUser, updateUser, setToken }
