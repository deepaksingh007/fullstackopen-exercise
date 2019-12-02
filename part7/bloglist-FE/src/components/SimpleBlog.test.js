import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import SimpleBlog from './SimpleBlog'
import { render, fireEvent, waitForElement } from '@testing-library/react'

describe('SimpleBlog', () => {
  const blog = {
    title: 'blog title',
    author: 'Max Musterman',
    likes: 8
  }
  const onClickMock = jest.fn()
  test('component renders title, author and likes', () => {
    const simpleBlogComp = render(<SimpleBlog blog={blog} onClick={onClickMock}></SimpleBlog>)
    expect(simpleBlogComp.container).toHaveTextContent('blog title Max Musterman')
    expect(simpleBlogComp.container).toHaveTextContent('blog has 8 likes')
  })
  test('onClick function will be called when like button is pressed', async() => {
    const simpleBlogComp = render(<SimpleBlog blog={blog} onClick={onClickMock}></SimpleBlog>)
    await waitForElement(() => simpleBlogComp.container.querySelector('button'))
    const button = simpleBlogComp.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(onClickMock.mock.calls.length).toBe(2)
  })
})