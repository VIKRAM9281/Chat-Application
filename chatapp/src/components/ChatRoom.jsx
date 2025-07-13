import React, { useEffect, useState, useRef } from "react";
import { socket } from "../ustils/socket";
import { formatTime } from "../ustils/constant";

const ChatRoom = ({ screenName }) => {
  const [chat, setChat] = useState('');
  const [chatmsg, setChatmsg] = useState([]);
  const chatContainerRef = useRef(null);

  const handleChat = (msg) => {
    setChatmsg(msg);
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (!chat.trim()) return;
    const time = formatTime(); // Should return something like "10:30 AM"
    socket.emit('send-message', { name: screenName, msg: chat.trim(), time:time });
    setChat('');
  };

  useEffect(() => {
    socket.on('user-message', handleChat);
    return () => {
      socket.off('user-message', handleChat);
    };
  }, []);

  // Auto scroll to bottom on new message
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatmsg]);

  return (
    <div className="chat-room-wrapper">
      <h4 className="chat-title">Welcome to Global Chat Room</h4>
      <div className="chat-container" ref={chatContainerRef}>
        {chatmsg.map((chat, ind) => (
          <div
            key={ind}
            className={`chat-bubble ${chat.name === screenName ? 'self' : 'user'}`}
          >
            <div className="chat-name">{chat.name === screenName ? '' : chat.name}</div>
            <div className="chat-msg">{chat.msg}</div>
            <div className="chat-time">{chat.time}</div>
          </div>
        ))}
      </div>
      <form className="chat-input-container" onSubmit={handleSendMsg}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={chat}
          onChange={(e) => setChat(e.target.value)}
        />
        <button type="submit" className="chat-send-btn">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
