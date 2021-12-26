/* eslint-disable linebreak-style */
import React from 'react'
import Notification from './Notification'
import propTypes from 'prop-types'
const LoginForm = ({ errorMessage, handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
  
  return(
    <div>
      <h2>Login</h2>
      <Notification message={errorMessage} />
      <br></br>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={ username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={ password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  handleUsernameChange: propTypes.func.isRequired,
  handlePasswordChange: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired
}

export default LoginForm