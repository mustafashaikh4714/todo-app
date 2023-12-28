import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login } from '../../service/apiService'
import { setUser, store } from '../../store/store'
import './login.css'

const LoginForm = () => {
  // State to manage form inputs
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  // State to manage form errors
  const [errors, setErrors] = useState({
    username: '',
    password: ''
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
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // TODO: Handle login logic (e.g., API call, authentication)
    // Redirect to profile after successful login

    try {
      const response = await login(formData)
      console.log('response', response)

      if (response.errors) {
        window.alert(response.errors.message)
      }
      if (!response.errors) {
        const data = dispatch(setUser(response.data.user))
        store.dispatch(setUser(data))
        localStorage.setItem('user', JSON.stringify(data))

        navigate('/profile')
      }

      // Reset form and errors after successful submission
      setFormData({
        username: '',
        password: ''
      })
      setErrors({
        username: '',
        password: ''
      })
    } catch (error) {
      console.error('Error during login:', error.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
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
          <button type='submit'>Login</button>
        </div>
      </form>
      <p>
        Don't have an account?{' '}
        <span className='toggle-link' onClick={() => navigate('/signup')}>
          Signup
        </span>
      </p>
    </div>
  )
}

export default LoginForm
