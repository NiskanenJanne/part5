import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const removeBlog = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`)
  return request.data
}

const create = async newBlog => {
  console.log(newBlog)
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}


const update = async (id, title, author, url, likes, user) => {
  console.log(id, likes)
  const updatedBlog = {
    title: title,
    author: author,
    user: user,
    url: url,
    likes: likes,
    id: id
  }
  const request = await axios.put(`${ baseUrl}/${id}`, updatedBlog)
  return request.data
}


export default { getAll, create, update, setToken, removeBlog }