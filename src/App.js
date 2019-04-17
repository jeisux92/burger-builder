import React, { Component } from 'react';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <header className={classes.Appheader}>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className={classes.Applink}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
