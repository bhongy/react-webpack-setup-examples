import React from 'react'
import ReactDOM from 'react-dom'

const app =
  <h1 onClick={() => console.log('Woohoo!')}>
    Hello, world!
  </h1>

ReactDOM.render(
  app,
  document.getElementById('react-root')
)
