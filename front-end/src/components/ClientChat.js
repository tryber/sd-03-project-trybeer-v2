// import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
// import axios from 'axios';
// import './ClientChat.css';

// const io = require('socket.io-client');
// const socket = io('http://localhost:3001', { transports: ['websocket'] });

// const connectWithBack = async () => {
//   const { token } = JSON.parse(localStorage.getItem('user'));
//   const response = await axios.get('http://localhost:3001/products', { headers: { authorization: token } });
//   return response;
// };

// function ClientChat() {
//   const [chat, setChat] = useState([]);
//   const user = JSON.parse(localStorage.getItem('user')) || null;

//   socket.on('message', ({ message, user, time }) => {
//     const nickname = user.role === 'administrator' ? 'Loja' : user.email;
//     setChat([...chat, { nickname, time, message }]);
//   });

//   const displayMessage = () => {
//     const message = document.getElementById('message-input').value;
//     socket.emit('message', { message, user });
//     document.getElementById('message-input').value = '';
//   }

//   const getData = async () => {
//     try {
//       await connectWithBack();
//     } catch (e) {
//       return e;
//     }
//     return false;
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div>
//       { user === null && <Redirect to="/login" />}
//       { /* <ClientMenu /> */ }
//       <div className="chat-div">
//         {chat.length > 0 && chat.map((item) =>
//           <div>
//             <p>{`${item.nickname} - ${item.time}`}</p>
//             <p>{ item.message }</p>
//           </div>
//         )}
//       </div>
//       <input id="message-input" />
//       <button onClick={() => displayMessage()}>Enviar Mensagem</button>
//     </div>
//   )
// };

// export default ClientChat;
