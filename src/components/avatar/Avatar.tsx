import React from 'react';
import './Avatar.css';

interface Props {
    source: string;
}

const Avatar: React.FC<Props> = ({ source }) => {
    return (
        <div className="chat-message__avatar">
            <img src={source} alt="avatar" />
        </div>
    );
}
export default Avatar;