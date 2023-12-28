import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'

import './App.css'
import LoginForm from './pages/login/login'
import UserProfile from './pages/profile/Profile'
import SignupForm from './pages/signup/Signup'

function App() {
  const user = localStorage.getItem('user')

  const isLoggedIn = user ? true : false

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route
          path='/profile'
          element={isLoggedIn ? <UserProfile /> : <Navigate to='/login' />}
        />
        <Route
          path='/'
          element={
            isLoggedIn ? <Navigate to='/profile' /> : <Navigate to='/login' />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
