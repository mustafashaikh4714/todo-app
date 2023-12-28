// apiService.js

const BASE_URL = 'http://localhost:9000/api'

export const signup = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    const data = await response.json()
    if (!response.ok) {
      return {
        status: response.status,
        ...data
      }
    }

    return data
  } catch (error) {
    console.error('Error during signup:', error.message)
  }
}

export const login = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })

    const data = await response.json()

    if (!response.ok) {
      // Handle errors
      return {
        status: response.status,
        ...data
      }
    }

    return data
  } catch (error) {
    console.error('Error during login:', error.message)
  }
}
