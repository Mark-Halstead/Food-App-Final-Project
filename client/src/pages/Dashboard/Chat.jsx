import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io();

function Chat() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [join, setJoin] = useState(false);
  const [create, setCreate] = useState(false);
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleJoinClick = () => {
    setJoin(true);
    setCreate(false);
  };

  const handleCreateClick = () => {
    setCreate(true);
    setJoin(false);
  };

  const handleRoomSubmit = () => {
    if (name && (join || create) && (!join || code)) {
      const data = { name, code, join, create };
      socket.emit("join_room", data);
      setRoom(code);
      setName("");
      setCode("");
      setJoin(false);
      setCreate(false);
    }
  };

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue) {
      socket.emit("message", { data: inputValue });
      setInputValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="App">
      {room ? (
        <div className="Chat">
          <div className="Messages">
            {messages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
          <div className="Input">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputValueChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here"
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <div className="RoomForm">
          <h2>Create or Join Chat Room</h2>
          <div className="Input">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="JoinCreate">
            <button className={join ? "active" : ""} onClick={handleJoinClick}>
              Join
            </button>
            <button
              className={create ? "active" : ""}
              onClick={handleCreateClick}
            >
              Create
            </button>
          </div>
          {join && (
            <div className="Input">
              <input
                type="text"
                placeholder="Room Code"
                value={code}
                onChange={handleCodeChange}
              />
            </div>
          )}
          {join ||
            (create && (
              <div className="Input">
                <button onClick={handleRoomSubmit}>Submit</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Chat;

