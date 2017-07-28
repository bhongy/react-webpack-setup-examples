import React, { PureComponent } from 'react';
import asyncComponent from './async-component';
import Header from './header';
import s from './app.css';

const AsyncFooter = asyncComponent(() =>
  import('./footer').then(module => module.default)
);

/* eslint-disable */
class App extends PureComponent {
  render() {
    return (
      <main className={s.page}>
        <Header />
        <h1 onClick={() => console.log('Woohoo!')}>
          Hello, world!
        </h1>
        <input />
        <AsyncFooter />
      </main>
    )
  }
}

export default App
