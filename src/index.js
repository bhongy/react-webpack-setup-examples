import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const rootElement = document.getElementById('react-root')
const render = (Component) => {
  ReactDOM.render(<Component />, rootElement)
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', () => {
    // for Webpack 2, do not need to re-import module for HMR
    // https://github.com/gaearon/react-hot-loader/tree/master/docs#webpack-2
    render(App)
  })
}
