import './App.css';
import ChatComponent from './Components/ChatComponent';
import React from 'react';


function App() {
  return (
    <div className="App">
      <header>
        <h1>Joke Generator</h1>
        <h3>Pick your joke topic and comedian</h3>
      </header>
      <ChatComponent />
    </div>
  );
}

export default App;
