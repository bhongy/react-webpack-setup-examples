import React from 'react';
import ReactDOM from 'react-dom';
// AppContainer is a necessary wrapper component for HMR
import App from './app';
import 'raf/polyfill'; // react 16 needs requestAnimationFrame

ReactDOM.render(<App />, document.getElementById('react-root'));
