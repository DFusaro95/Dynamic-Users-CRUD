
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import UserCard from './components/UserCard'
import { BsSun } from 'react-icons/bs'
import { BsMoon } from 'react-icons/bs'

export const ThemeContext = createContext(null);

const baseURL = 'https://users-crud1.herokuapp.com'

function App() {

  const [formIsClose, setFormIsClose] = useState(false);
  // Update the UserCard
  const [updateInfo, setUpdateInfo] = useState();
  // Obtiene al usuario
  const [users, setUsers] = useState();
  // Cambia el tema
  const [theme, setTheme] = useState('light');
  // esta funcion nos realiza el GET de los users
  const getAllUsers = () => {
    const URL = `${baseURL}/users/`
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Crear usuario
  const createNewUser = data => {
    const URL = `${baseURL}/users/`
    axios.post(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  };

  //Eliminar un usuario
  const deleteUserById = id => {
    const URL = `${baseURL}/users/${id}/`
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        alert('Usuario eliminado exitosamente!!')
        getAllUsers()
      })
      .catch(err => console.log(err))
  };

  // Actualizar un usuario
  const updateUserById = (id, data) => {
    const URL = `${baseURL}/users/${id}/`
    axios.patch(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  };

  const handleOpenForm = () => {
    setFormIsClose(true)
  };
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App" id={theme}>
        <div className="app__container--title">
          <div className="light__mode">
            <button onClick={toggleTheme} className='light__mode--icon'><BsSun /> || <BsMoon /></button>
          </div>
          <h1> User Cards Creator </h1>
          <button onClick={handleOpenForm} className="modal__btn">Create Your Card</button>
        </div>
        <div className={`form__container ${formIsClose && 'form__disable'}`}>
          <Form
            createNewUser={createNewUser}
            updateInfo={updateInfo}
            updateUserById={updateUserById}
            setUpdateInfo={setUpdateInfo}
            setFormIsClose={setFormIsClose}
          />
        </div>
        <div className='user__container'>
          {
            users?.map(user => (
              <UserCard
                key={user.id}
                user={user}
                deleteUserById={deleteUserById}
                setUpdateInfo={setUpdateInfo}
                setFormIsClose={setFormIsClose}
              />
            ))
          }
        </div>
        <footer className='footer__container'>
          <h3 className="footer__title">Copyright &#169; 2022 | All Rights Reserved</h3>
        </footer>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
