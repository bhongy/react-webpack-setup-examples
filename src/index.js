import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './header'

class App extends Component {
  state = {
    footer: null,
  }

  componentDidMount() {
    // need babel-presets-stage-3 or babel-plugin-syntax-dynamic-import
    // to prevent parse error for dynamic import
    // https://webpack.js.org/guides/code-splitting-async/#usage-with-babel
    import('./footer')
      .then(module => module.default)
      .then(Footer => {
        this.setState({ footer: <Footer />})
      })
      .catch(error => null)
  }

  render() {
    return (
      <main>
        <Header />
        <h1 onClick={() => console.log('Woohoo!')}>
          Hello, world!
        </h1>
        {this.state.footer}
      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
)
