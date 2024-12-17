import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

const Search = ({ users }) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const initializeData = async () => {
            setLoading(true)
            await dispatch(initializeUsers())
            setLoading(false)
        }
        initializeData()

    }, [dispatch])

    const filteredUsers = searchTerm ? users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []

    return (
        <div className="container col-4 m-5">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <div className="spinner spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (

                <div>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {filteredUsers.length > 0 && (
                        filteredUsers.map((user) => (
                            <div key={user.username} className="d-flex align-items-center mb-3">
                                <a
                                    href={`/profile/${user.username}`}
                                    className="text-decoration-none d-flex align-items-center"
                                >
                                    <img
                                        src={user.imageUrl}
                                        alt="Profile"
                                        className="rounded-circle me-4"
                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                    />
                                    <div className="mt-3">
                                        <p className="text-dark">
                                            <strong>{user.username}</strong>
                                            <br />
                                            {user.name}
                                        </p>
                                    </div>
                                </a>
                                <hr />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default Search
