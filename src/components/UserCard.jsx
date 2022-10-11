import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { BsPencilSquare } from 'react-icons/bs'
import { HiCake } from 'react-icons/hi'
import './styles/UserCard.css'

const UserCard = ({ user, deleteUserById, setUpdateInfo, setFormIsClose}) => {


  const handleEdit = () => {
    setUpdateInfo(user)
    setFormIsClose(true)
  }



  return (
    <article className='card'>
        <h2 className='card__name'>{`${user.first_name} ${user.last_name}`}</h2>
        <hr />
        <ul className='card__list'>
          <span>Email: <p className='email'>{`${user.email}`}</p></span>
          <span>Birthday: <p className='bd'><HiCake /> {`${user.birthday}`}</p></span>
        </ul>
        <hr />
        <footer className='btn__container'>
          <i className='delete__btn' onClick={() => deleteUserById(user.id)}><BsFillTrashFill /></i>
          <i className='edit__btn' onClick={handleEdit}><BsPencilSquare /></i>
        </footer>
    </article>
  )
}

export default UserCard