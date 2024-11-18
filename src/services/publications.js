import axios from 'axios'
//const baseUrl = '/api/publications'
const baseUrl = 'http://localhost:3001/publications' // IMPLEMENTACION TEMPORAL PARA HACER LAS PRUEBAS

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllPublications = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createPublication = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updatePublication = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAllPublications, createPublication, updatePublication, setToken }