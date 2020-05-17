import React from 'react';

import './Message.css';

const Message = ({ message: {user, text}, name }) => {
    let isSentByCurrUser = false;

    if (user === name) {
        isSentByCurrUser = true;
    }

    return (
    isSentByCurrUser
    ? (
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{name}</p>
            <div className="MessageBox backgroundBlue">
                <p className="messageText colorWhite">{text}</p>
            </div>
        </div>
    )
    : (
        <div className="messageContainer justifyStart">
            <div className="MessageBox backgroundLight">
                <p className="messageText colorDark">{text}</p>
            </div>
            <p className="sentText pl-010">{user}</p>
        </div>
    ));
}

export default Message;