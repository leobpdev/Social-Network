import axios from 'axios'

const baseUrl = '/api/messages'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllMessages = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = id ? `${baseUrl}/${id}` : baseUrl

  const response = await axios.get(url, config)
  return response.data
}

const createMessage = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

export default { getAllMessages, createMessage, setToken }