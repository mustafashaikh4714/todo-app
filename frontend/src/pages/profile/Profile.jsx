// UserProfile.js

import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const userInfo = useSelector((state) => state.user.userInfo)
  return (
    <div>
      <h2>User Profile</h2>
      <p>User: {JSON.stringify(userInfo)}</p>
      {/* Display user profile information here */}
    </div>
  )
}

export default UserProfile
