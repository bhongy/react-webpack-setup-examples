import React, { PureComponent } from 'react'
import Header from './header'
import s from './app.css'

/* eslint-disable react/jsx-no-bind */
class App extends PureComponent {
  state = {
    footer: null,
  }

  componentDidMount() {
    // need babel-presets-stage-3 or babel-plugin-syntax-dynamic-import
    // to prevent parse error for dynamic import
    // https://webpack.js.org/guides/code-splitting-async/#usage-with-babel
    import('./footer')
      .then(module => module.default)
      .then((Footer) => {
        this.setState({ footer: <Footer /> })
      })
      .catch(() => null)
  }

  render() {
    return (
      <main className={s.page}>
        <Header />
        <h1 onClick={() => console.log('Woohoo!')}>
          Hello, world!
        </h1>
        <input />
        {this.state.footer}
      </main>
    )
  }
}

export default App
