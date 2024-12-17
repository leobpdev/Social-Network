import axios from 'axios'

const baseUrl = '/api/messages'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllMessages = async (username) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = username ? `${baseUrl}/${username}` : baseUrl

  const response = await axios.get(url, config)
  return response.data
}

const createMessage = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAllMessages, createMessage, setToken }