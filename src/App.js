import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [newBlogVisible, setNewBlogVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <h2>Blogs</h2>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            errorMessage={errorMessage}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: newBlogVisible ? '' : 'none' }

    return (
      <div>
        <h2>Blogs</h2>

        <form onSubmit={handleLogout}>
          <p>{user.name} is logged in.
            <button type="submit">logout</button>
          </p>
        </form>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            /*addBlog={addBlog}
              title={title}
              author={author}
              url={url}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleURLChange={handleURLChange}*/
          />
          <button onClick={() => setNewBlogVisible(false)}>cancel</button>
        </div>
        <div>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
      </div>

    )
  }

  /*<div style={hideBlog}>
          <button onClick={() => setBlogVisible(true)}>view</button>
        </div>
        <button onClick={() => setBlogVisible(false)}>hide</button>
       */
  return (
    <div>
      {user === null ?
        loginForm():
        <div>
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App