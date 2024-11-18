import axios from 'axios'

const baseUrl = 'http://localhost:3001/users'

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addPublicationToUser = async (userId, publicationId) => {
  const response = await axios.get(`${baseUrl}/${userId}`)
  const user = response.data

  const updatedUser = {
    ...user,
    publications: user.publications.concat(publicationId),
  }

  await axios.put(`${baseUrl}/${userId}`, updatedUser)
  return updatedUser
}

export default { getAllUsers, addPublicationToUser }
