import React, { useState } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './Components/Home';
import './App.css';
import Login, { IUser } from './Components/Login/Login';

function App() {
  const [user, setUser] = useState<IUser>({} as IUser)
  return (
    <div className="App">
      {
        user.email && user.password ? <h1 data-testid="_test-head">Welcome</h1> : <Login userData={setUser} />
      }
    </div>
  );
}

export default App;
