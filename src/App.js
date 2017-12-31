import React, { Component } from 'react';
import './App.css';
import TodoArea from './Components/TodoArea';
import config from './config';

class App extends Component {
  render() {
    return (
      <div id="app" className="App container-fluid fill-viewport d-flex flex-column">
        <header className="row justify-content-center bg-dark text-white py-3">
          <h1 className="col display-5">Welcome to Planner</h1>
        </header>
        <TodoArea url={config.localUrl}/>
      </div>
    );
  }
}

export default App;
