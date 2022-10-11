import './styles/Form.css'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCloseCircle } from 'react-icons/ai';

// Default value for the form to reset
const resetForm = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  birthday: '',
}

const Form = ({createNewUser, updateInfo, updateUserById, setUpdateInfo, setFormIsClose}) => { 
  
  console.log(updateInfo)
  const {handleSubmit, register, reset} = useForm()


  useEffect(() => {
    if (updateInfo){
      reset(updateInfo)
    }
  }, [updateInfo])
  
  // Submit button con Create y Update
  const submit = data => {
    if (updateInfo) {
      updateUserById(updateInfo.id, data)
      setUpdateInfo()
    } else {
      createNewUser(data);
    }
    reset(resetForm);
    setFormIsClose(false)
  }

  const handleCloseForm = () => {
    setFormIsClose(false)
  }

  return (
    <div>
      <form className='form' onSubmit={handleSubmit(submit)}>
        <button onClick={handleCloseForm} className="close__button">
          <AiOutlineCloseCircle />
        </button>
        <h2 className='form__title'>{updateInfo ? 'Edit User' : 'Create User'}</h2>
        <div className='input__container'>
          <label className='form__label' htmlFor="email">Email</label>
          <input className='form__input' type="email" id='email' placeholder='Enter Your Email..' {...register('email')}/>  
        </div>
        <div className='input__container'>
          <label className='form__label' htmlFor="password">Password</label>
          <input className='form__input' type="password" id='password' placeholder='Enter Your Password..' {...register('password')}/>  
        </div>
        <div className='input__container'>
          <label className='form__label' htmlFor="first_name">First name</label>
          <input className='form__input' type="text" id='first_name' placeholder='Enter Your First Name..' {...register('first_name')}/>  
        </div>
        <div className='input__container'>
          <label className='form__label' htmlFor="last_name">Last Name</label>
          <input className='form__input' type="text" id='last_name' placeholder='Enter Your Last Name..' {...register('last_name')}/>  
        </div>
        <div className='input__container'>
          <label className='form__label' htmlFor="birthday">Birthday</label>
          <input className='form__input' type="date" id='birthday' {...register('birthday')}/>  
        </div>
        <button className='form__button'>{updateInfo ? 'Update' : 'Create'}</button>
      </form>
    </div>
  )
}

export default Form