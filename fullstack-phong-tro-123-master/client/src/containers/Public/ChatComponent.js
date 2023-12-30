import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import avt from '../../assets/anon-avatar.png'
const ChatComponent = () => {

  const {currentData} = useSelector(state => state.user)
  const navigate=useNavigate();

  const handleBack = () => {
    navigate('/')  
  }
  useEffect(() => {
    const socket = io.connect('http://localhost:3001'); // Your socket connection initialization

    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');


    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat message', input.value, currentData);
        input.value = '';
      }
    });
    socket.on('room', (data) => {
      if (data) {
        const item = document.createElement('li');
        item.textContent = 'Chào mừng bạn đến với phòng chat ' + data;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
      }
    });

    socket.on('out room', (data) => {
      const item = document.createElement('li');
      item.textContent = 'Bạn đã rời khỏi phòng ' + data;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('message', (msg, currentData) => {
      const item = document.createElement('li');
      const imageElement = document.createElement('img');
      imageElement.src = currentData?.avatar || avt;
      item.appendChild(imageElement);
      item.appendChild(document.createTextNode(currentData?.name ? currentData.name + ': ' + msg : 'Người dùng ẩn danh' + ': ' + msg));
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
    function myFunction(){
      var inputTxt = document.getElementById('txtRoom').value;
      socket.emit('chat room', inputTxt);
      document.getElementById('txtRoom').value = ''; // Clear the input value
  }
    function leaveRoom(){
      socket.emit('out', '');
      // document.getElementById('txtRoom').value = ''; // Clear the input value
  }

  const toggleButton = document.getElementById('toggle-btn');

  toggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (socket.connected) {
      toggleButton.innerText = 'Connect';
      socket.disconnect();
    } else {
      toggleButton.innerText = 'Disconnect';
      socket.connect();
    }
  });
  })
  


  return (
    <div >
    <div>      
      <h1 className='font-bold'>HỖ TRỢ TRỰC TUYẾN 24/7</h1>
      {/* <div>      <input type="text" id="txtRoom" />
      <button 
      style={{ fontSize: '1em', padding: '10px 20px' }}

       type="submit" id="myButton"
       onclick="myFunction()">Join Room</button>
      <button type="submit" id="leaveRoomButton" onclick="leaveRoom()">Leave Room</button>  </div> */}
            <div className="flex  w-full  items-center justify-center ">
      <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-md mt-10 ">
    <ul id="messages" ></ul>
     <form id="form" action="">
      <input id="input" autocomplete="off" placeholder='Type your message...' /><button>Send</button>
        <button id="toggle-btn">Disconnect</button>
        <button onClick={handleBack}>Close</button>
        {/* <input type="text" id="txtRoom" placeholder='Type a room...' />
      <button 
       type="submit" id="myButton"
       onclick="myFunction()">Join Room</button>
      <button type="submit" id="leaveRoomButton" onclick="leaveRoom()">Leave Room</button> */}

      </form>
      </div>
      </div>
</div>
      <style>
        {`
img {
  width: 50px;
  height: 50px; 
  border-radius: 50%; 

}

          #messages {
            list-style-type: none;
            margin: 0;
            padding: 0;
            
          }
          #messages > li {
            padding: 3rem 4rem;
            // text-align: right; 
            
          }
          #messages > li:nth-child(odd) {
            background: #efefef;
          }
          body { 
            margin: 0; 
            padding-bottom: 3rem; 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
          }
          #form { 
            background: rgba(0, 0, 0, 0.15); 
            padding: 0.25rem; 
            position: fixed; 
            bottom: 0; 
            left: 200px; 
            right: 100px; 
            display: flex; 
            height: 3rem; 
            box-sizing: border-box; 
            backdrop-filter: blur(10px); 
          }
          #input { 
            border: none; 
            padding: 0 1rem; 
            flex-grow: 1;
            border-radius: 2rem; 
            margin: 0.25rem; 
          }
          #input:focus { 
            outline: none; 
          }
          #form > button { 
            background: #333; 
            border: none; 
            padding: 0 1rem; 
            margin: 0.25rem; 
            border-radius: 3px; 
            outline: none; 
            color: #fff; 
          }
          #messages { list-style-type: none; margin: 0; padding: 0; }
          #messages > li { padding: 0.5rem 1rem; }
          #messages > li:nth-child(odd) { background: #efefef; }    
        `}
      </style>
    </div>
  );
};
export default ChatComponent;
