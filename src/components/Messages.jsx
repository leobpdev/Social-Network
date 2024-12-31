import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'
import { initializeMessages, createMessage } from '../reducers/messageReducer'

const Messages = ({ users, messages, loggedUser }) => {
    const dispatch = useDispatch()
    const { username } = useParams() // Capturamos el parámetro de la URL
    const [loading, setLoading] = useState(true)
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        const initializeData = async () => {
            setLoading(true)
            await dispatch(initializeUsers())
            await dispatch(initializeMessages(username))
            setLoading(false)
        }
        initializeData()
    }, [dispatch, username])

    const findUserById = (id) => users.find((user) => user.id === id) || null

    // Filtrar y organizar chats
    const groupedChats = messages.reduce((chats, message) => {
        const sender = findUserById(message.sender)
        const receiver = findUserById(message.receiver)

        const userToShow =
            sender?.username === loggedUser.username ? receiver : sender

        if (userToShow) {
            chats[userToShow.username] = {
                user: userToShow,
                lastMessage: message.content,
            }
        }

        return chats
    }, {})

    const chatList = Object.values(groupedChats)

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (username) {
        const user = users.find((u) => u.username === username)

        if (!user) {
            return <p>Usuario no encontrado</p>
        }

        const conversation = messages.filter((message) => {
            const sender = findUserById(message.sender.id)
            const receiver = findUserById(message.receiver.id)

            return (
                (sender?.username === loggedUser.username && receiver?.username === user.username) ||
                (sender?.username === user.username && receiver?.username === loggedUser.username)
            )
        })

        const handleSendMessage = async (e) => {
            e.preventDefault()
            if (newMessage.trim()) {
                try {
                    const messageToSend = {
                        content: newMessage
                    }
                    await dispatch(createMessage(username, messageToSend))
                    setNewMessage('')
                } catch (error) {
                    console.error('Error sending message:', error)
                }
            }
        }

        return (
            <div className="container d-flex flex-column min-vh-100">
                <nav className="navbar navbar-expand-lg rounded m-2 bg-primary">
                    <Link to="/messages">
                        <i className="bi bi-arrow-left m-2 text-white"></i>
                    </Link>
                    <img
                        src={user.imageUrl}
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                        }}
                    />
                    <h4 className="text-white m-2">{user.name}</h4>
                </nav>

                <div className="chat-continer p-3 flex-grow-1 overflow-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>
                    {conversation.map((message) => (
                        <div
                            key={message._id}
                            className={`d-flex mb-3 ${message.sender.username === loggedUser.username
                                ? 'justify-content-end'
                                : 'justify-content-start'
                                }`}
                        >
                            <div
                                className={`p-3 rounded-3 ${message.sender.username === loggedUser.username
                                    ? 'bg-primary text-white'
                                    : 'bg-light text-dark'
                                    }`}
                                style={{ maxWidth: '60%' }}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSendMessage} className="d-flex p-3 border-top">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="form-control me-2"
                        placeholder="Write a message..."
                    />
                    <button type="submit" className="btn btn-primary">
                        <i className="bi bi-send-fill"></i>
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div className="container m-5">
            <h3>Chats</h3>
            {chatList.map(({ user, lastMessage }) => (
                <div key={user.id} className="mb-3">
                    <div className="d-flex align-items-center mb-3">
                        <Link
                            to={`/messages/${user.username}`}
                            className="text-decoration-none d-flex align-items-center"
                        >
                            <img
                                src={user.imageUrl}
                                alt="Profile"
                                className="rounded-circle me-4"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    objectFit: 'cover',
                                }}
                            />
                            <div className="mt-3">
                                <p className="text-dark">
                                    <strong >{user.name}</strong>
                                    <br />
                                    {lastMessage}
                                </p>
                            </div>
                        </Link>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default Messages
