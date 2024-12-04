const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error mt-3" >
      {message}
    </div>
  )
}

export default Notification