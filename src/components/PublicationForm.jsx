import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPublication } from '../reducers/publicationReducer'

const PublicationForm = ({ loggedUser }) => {
  const [newPublication, setNewPublication] = useState('')
  const [selectedImage, setSelectedImage] = useState(null) // Para almacenar el archivo seleccionado
  const [errorMessage, setErrorMessage] = useState(null)
  const dispatch = useDispatch()

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file) // Guardar el archivo seleccionado
    }
  }

  const addPublication = async (event) => {
    event.preventDefault()

    if (!newPublication.trim() || !selectedImage) {
      setErrorMessage('Please complete both fields before publishing.');
      return
    }

    const formData = new FormData()
    formData.append('content', newPublication)
    if (selectedImage) {
      formData.append('image', selectedImage) // 'image' debe coincidir con el nombre usado en multer
    }
    dispatch(createPublication(formData, loggedUser.token))
    setNewPublication('')
    setSelectedImage(null)
  }

  return (
    <div className="container col-md-4 mt-4">
      <form onSubmit={addPublication}>
        <h3 className="mb-3 fw-normal">New Publication</h3>
        <div className="mb-1">
          <input
            id="imageInput"
            type="file"
            className="form-control"
            accept="image/*"  // Solo permite archivos de imagen
            onChange={handleImageChange}  // Llama a la función cuando el usuario selecciona un archivo
          />
        </div>
        <div className="mb-3">
          <input
            id="publicationInput"
            className="form-control"
            value={newPublication}
            onChange={(e) => setNewPublication(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        {errorMessage && (
          <div className="error mt-3">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  )
}

export default PublicationForm
