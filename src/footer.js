// @flow
import React from 'react';
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

export default Footer;
