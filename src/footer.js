import React from 'react';
import s from './footer.css';

const Footer = () => 
  <footer>
    ©&nbsp;
    <span className={s.date}>{new Date().getFullYear()}</span>
    <button className={s.button}>Press!</button>
  </footer>;


export default Footer;
