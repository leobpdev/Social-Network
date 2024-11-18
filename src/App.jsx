import { useState, useEffect } from 'react';
import Publication from './components/Publication';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import PublicationForm from './components/PublicationForm';
import publicationService from './services/publications';
import userService from './services/users';
import loginService from './services/login';

const App = () => {
  const [publications, setPublications] = useState([]);
  const [newPublication, setNewPublication] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({
    "id": 1,
    "username": "testuser",
    "name": "Test User",
    "publications": [
      1,
      4
    ]
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPublicationappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      publicationService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    publicationService.getAllPublications().then(initialPublications => {
      setPublications(initialPublications);
    });
  }, []);

  const handleLike = (id) => {
    const publication = publications.find(n => n.id === id);
    const likedPublication = { ...publication, likes: publication.likes + 1 };

    publicationService.updatePublication(id, likedPublication).then(returnedPublication => {
      setPublications(publications.map(publication => publication.id !== id ? publication : returnedPublication));
    });
  };

  const handlePublicationChange = (event) => {
    setNewPublication(event.target.value);
  };

  const addPublication = (event) => {
    event.preventDefault();
    const publicationObject = {
      content: newPublication,
      imageUrl: 'https://stickerly.pstatic.net/sticker_pack/M6DUfwweCC1PPhJ9HOcpw/DAS3U4/19/-806376787.png',
      likes: 0,
      user: user.id, // Asignar el ID del usuario logueado
    };

    publicationService.createPublication(publicationObject).then(returnedPublication => {
      setPublications(publications.concat(returnedPublication));
      setNewPublication('');
      userService.addPublicationToUser(user.id, returnedPublication.id);
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedPublicationappUser', JSON.stringify(user));
      publicationService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div>
      <h1>Social Network</h1>
      <Notification message={errorMessage} />
      {user === null
        ? <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
        : <div>
            <p>{user.name} logged in</p>
            <PublicationForm newPublication={newPublication} handlePublicationChange={handlePublicationChange} addPublication={addPublication} />
          </div>
      }
      <ul>
        {publications.map(publication =>
          <Publication key={publication.id} publication={publication} handleLike={() => handleLike(publication.id)} />
        )}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
