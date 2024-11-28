import axios from 'axios'
const baseUrl = '/api/publications'
//const baseUrl = 'http://localhost:3001/publications' // IMPLEMENTACION TEMPORAL PARA HACER LAS PRUEBAS

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllPublications = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
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
    console.error('Error al actualizar la publicación:', error);
  }
}

export default { getAllPublications, createPublication, updatePublication, setToken }