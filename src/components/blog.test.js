/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent }  from '@testing-library/react'
import Blog from './Blog'



const blogobj = {
  title: 'testBlog',
  author: 'testAuthor',
  url: 'testUrl',
  user:{
    username: 'testUser'
  },
  likes: '2'
}

const mockHandler = jest.fn()

const component = render(
  <Blog blog={blogobj}  visible={mockHandler} addlike={mockHandler}/>
)
test('Name and author are visible, likes and url not', () => {

  const div = component.container.querySelector('.first')
  component.debug

  expect(div).toHaveTextContent('testBlog')
  expect(div).toHaveTextContent('testAuthor')
  expect(div).not.toHaveTextContent('testUrl')
  expect(div).not.toHaveTextContent('2')
  expect(div).not.toHaveTextContent('testUser')
})

test('Everything is visible', async () => {

  const viewButton = component.container.querySelector('show')
  fireEvent.click(viewButton)

  const div = component.container.querySelector('.all')
  component.debug

  expect(div).toHaveTextContent('testBlog')
  expect(div).toHaveTextContent('testAuthor')
  expect(div).toHaveTextContent('testUrl')
  expect(div).toHaveTextContent('2')
  expect(div).toHaveTextContent('testUser')
})
test('Like is clicked twice', async () => {

  const viewButton = component.getByText('show')

  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)

})


/*'testUrl','2','testUser'*/