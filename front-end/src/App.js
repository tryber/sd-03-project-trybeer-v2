import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketIo from 'socket.io-client';
import Routers from './Routers/index';
import { socketToReduxAction } from './Redux/action/socketToReduxAction';
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = socketIo('localhost:3001');
    console.log(socket)
    dispatch(socketToReduxAction(socket));
  }, []);

  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;
