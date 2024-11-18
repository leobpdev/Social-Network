const Publication = ({ publication, handleLike }) => {
  return (
    <div>
      {publication.content}
      <br/>
      {<img src={publication.imageUrl} alt="Nota" width="100" />}
      <br/>
      <button onClick={() => handleLike(publication.id)}>Like</button>
      <br/>
      {publication.likes} {publication.likes === 1 ? 'like' : 'likes'}
    </div>
  )
}

export default Publication
