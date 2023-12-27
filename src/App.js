import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

import Login from './Login';
import Signup from './Singup';
import Todo from './Todo';
import Forgotpwd from './Forgotpwd';

const App = () => {
  const[isLoggedIn,setIsLoggedIn] = React.useState(!!localStorage.getItem('token'));

  const handleLogin = (username) => {
      const token = {token:"authenticated",username:username};
      localStorage.setItem('token',JSON.stringify(token));
      setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <Routes>
        <Route 
        path = "/" 
        element = {!isLoggedIn?<Login onLogin={handleLogin}/>
                    :<Todo onLogout={handleLogout}/>} />

        <Route 
        path = "/Signup" 
        element = {<Signup />} />

        <Route 
        path = "/Todo" 
        element = {isLoggedIn?<Todo onLogout={handleLogout}/>
                              :<Login onLogin={handleLogin}/>}/>

        <Route  
        path = "/Forgotpwd" 
        element ={<Forgotpwd />} />

      </Routes>
    </Router>
  );
};

export default App;
