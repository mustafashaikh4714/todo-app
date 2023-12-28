import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { signup } from '../../service/apiService'
import { setUser, store } from '../../store/store'
import './signup.css'

const SignupForm = () => {
  // State to manage form inputs
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // State to manage form errors
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Simple form validation (you may use a library like Yup for more complex validation)
    const newErrors = {}
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Reset form and errors after successful submission
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setErrors({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    // TODO: Handle signup logic (e.g., API call, user registration)
    // Redirect to login after successful signup

    try {
      const response = await signup(formData)
      console.log('response', response)

      if (response.status === 200) {
        const data = dispatch(setUser(response.data.user))
        store.dispatch(setUser(data))
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/login')
      }
    } catch (error) {
      console.error('Error during signup:', error.message)
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <span className='error'>{errors.username}</span>}
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className='error'>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <span className='error'>{errors.password}</span>}
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <span className='error'>{errors.confirmPassword}</span>
          )}
        </div>
        <div>
          <button type='submit'>Signup</button>
        </div>
      </form>
      <p>
        Already have an account?{' '}
        <span className='toggle-link' onClick={() => navigate('/login')}>
          Login
        </span>
      </p>
    </div>
  )
}

export default SignupForm
