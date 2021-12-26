/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const BlogForm = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewURL] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = { title: title, author: author, url: url }
    blogService
      .create(blogObject).then(returnedBlog => {
        setErrorMessage(`A new blog ${title} by ${author} has been added`)
        setTimeout(() => { setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
      })
  }

  return (
    <div>
      <Notification message={errorMessage} />
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
    </div>
  )
}
export default BlogForm