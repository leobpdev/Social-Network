const PublicationForm = ({ newPublication, handlePublicationChange, addPublication }) => (
    <form onSubmit={addPublication}>
      <input
        value={newPublication}
        onChange={handlePublicationChange}
      />
      <button type="submit">save</button>
    </form>
  )
  
  export default PublicationForm
  