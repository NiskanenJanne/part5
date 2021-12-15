import React from 'react'
import Notification from './Notification'


const LoginForm = (
    {
    errorMessage,
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
    }
    ) => (
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

export default LoginForm