import axios from 'axios'

const baseUrl = '/api/publications'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllPublications = async (username) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = username ? `${baseUrl}/${username}` : baseUrl

  const response = await axios.get(url, config)
  return response.data
}

const createPublication = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updatePublication = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
  } catch (error) {
    console.error('Error updating post:', error);
  }
}

export default { getAllPublications, createPublication, updatePublication, setToken }