import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'


const Login = () => {
  let {loginUser} = useContext(AuthContext)

  return (
    <div>
      <h1 className='logintitle'>&#9782; Login</h1>
      <div className='loginform'>
        <form className='form' onSubmit={loginUser}>
          <div>
            <label className='labelform'>Email</label>
            <input type='email' name='email' className='inputarea'></input>
          </div>
          <div>
            <label className='labelform'>password</label>
            <input type='password' name='password' className='inputarea'></input>
          </div>
          <button className='buttonsubmit' type='submit'>Login</button>
        </form>
      </div>  
    </div>
  )
}

export default Login