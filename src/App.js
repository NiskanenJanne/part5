import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewURL] = useState('')
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
  /*
  const addBlog = (event) => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setErrorMessage(`A new blog ${title} by ${author} has been added`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setBlogs(blogs.concat(returnedBlog))
          setNewTitle('')
          setNewAuthor('')
          setNewURL('')
      })
      
  }
  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }
  const handleURLChange = (event) => {
    console.log(event.target.value)
    setNewURL(event.target.value)
  }*/

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
          <Notification message={errorMessage} />
          <p>{user.name} is logged in.</p>

          <form onSubmit={handleLogout}>
            <button type="submit">logout</button>
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
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />
        )}
      </div>

    )
  }

  /*alkuperäinen toimiva koodi, älä poista
  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <Notification message={errorMessage} />
      <br></br>
      <form onSubmit={handleLogin}>
        <div>
          username 
            <input
            type="text"
            value={ username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password 
            <input
            type="password"
            value={ password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
    </div>     
  )
   
  
  const blogForm = () => (
      <div>
        <h2>Blogs</h2>
        <Notification message={errorMessage} />
        <p>{user.name} is logged in.</p>

        <form onSubmit={handleLogout}>
          <button type="submit">logout</button>
        </form>
        <br></br>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              onChange={handleTitleChange} />
          </div>
          <div>
            author:
            <input
              type="author"
              value={author}
              onChange={handleAuthorChange} />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              onChange={handleURLChange} />
          </div>
          <br></br>
          <button type="submit">save</button>
        </form>

        {blogs.map(blog => <Blog key={blog.id} blog={blog} />
        )}
      </div>

  )
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