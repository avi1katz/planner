import React, { Component } from 'react';
import './App.css';
import TodoArea from './Components/TodoArea';

class App extends Component {
  render() {
    return (
      <div id="app" className="App container-fluid fill-viewport">
        <header className="App-header">
          <h1 className="App-title">Welcome to Planner</h1>
        </header>
        <TodoArea />
      </div>
    );
  }
}

export default App;
