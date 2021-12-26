import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [BlogVisible, setBlogVisible] = useState(false)
  const hideBlog = { display: BlogVisible ? 'none' : '' }
  const showBlog = { display: BlogVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBlog = async () => {
    if (window.confirm(`delete ${blog.title}?`)){
      await blogService.removeBlog(blog.id)
    }
  }
  const addLike = () => {
    blog.likes = blog.likes + 1
    blogService.update(blog.id, blog.title, blog.author, blog.url,blog.likes,blog.user)
  }


  return(
    <div style={blogStyle}>
      <div style={hideBlog} className="first">
        {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(true)}>show</button>
      </div>
      <div style={showBlog} className="all">
        <button onClick={() => setBlogVisible(false)} className='visible'>hide</button><br></br>
        {blog.title}<br></br>
        {blog.author}<br></br>
        {blog.url}<br></br>
        {blog.likes}<button onClick={addLike}>like</button><br></br>
        {blog.user.name}<br></br>
        <div style={showBlog} >
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog