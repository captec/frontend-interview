import React from 'react';
import logo from './logo.png';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://github.com/captec/frontend-interview"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Sgit adtarted
        </a>
      </header>
    </div>
  )
}

export default App;
