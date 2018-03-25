// @flow
import React from 'react';
import asyncComponent from './async-component';
import Header from './header';
import Todos from './todos';
import s from './app.css';

const AsyncFooter = asyncComponent(() =>
  import('./footer').then(module => module.default)
);

class App extends React.Component<{}> {
  render() {
    return (
      <main className={s.page}>
        <Header />
        <h1>Hello, world!</h1>
        <Todos />
        <AsyncFooter />
      </main>
    );
  }
}

export default App;
