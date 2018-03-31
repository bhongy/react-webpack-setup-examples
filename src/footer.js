// @flow strict
import React from 'react';
import { hot } from 'react-hot-loader';
import s from './footer.css';

class Footer extends React.Component<{}> {
  render() {
    return (
      <footer>
        ©&nbsp;
        <span className={s.date}>{new Date().getFullYear()}</span>
      </footer>
    );
  }
}

// enable hmr: react-hot-loader v4
export default hot(module)(Footer);
