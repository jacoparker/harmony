import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ( { location } ) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, ( ) => {
        });
        
        return () => {
            socket.emit("disconnect");

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        console.log(message);
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });
    
    socket.on("roomData", ({ users }) => {
        setUsers(users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages
                messages={messages}
                name={name}
                />
                <Input 
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                />
            </div>
        </div>
    );
}

export default Chat;