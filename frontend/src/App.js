// default

/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
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

export default App;
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/users",
    }).then(response => setUsers(response.data));
})

return (
  <ul>
    {users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
)
}

export default App;
