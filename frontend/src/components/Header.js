import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)

  return (
    <div className='app-header'>
      <h1><Link to='/'>My Notes</Link></h1>
      <div className='links'>
        {user ?
          <Link onClick={logoutUser} >Logout</Link>
          :
          <Link to='/register' className='registerlink'>Register</Link>
        }
        {
          !user && 
          <span className="betweenlinks">/</span>
        }
        {
          !user &&
          <Link to='/login' >Login</Link>
        }
      </div>
    </div>
  )
}

export default Header
