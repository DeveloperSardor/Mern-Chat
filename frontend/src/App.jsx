import React from 'react';
import { Route } from 'react-router-dom';
import './App.css'
import Chat from './pages/Chat';
import Error from './pages/Error';
import Home from './pages/Home';


const App = () => {
  return (
    <div className='app'>
     <Route path='/' component={Home} exact/>
     <Route path='/chats' component={Chat}/>
     <Route path='/error' component={Error}/>
    </div>
  );
};

export default App;