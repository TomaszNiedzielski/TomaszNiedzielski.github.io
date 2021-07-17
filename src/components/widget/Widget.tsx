import React from 'react';
import './Widget.css';

const Widget: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <img src="/assets/chat.png" alt="chat" className="chat-widget" onClick={onClick} />
    );
}
export default Widget;