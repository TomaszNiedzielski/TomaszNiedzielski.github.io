import React from 'react';
import { Message } from '../chat/Chat';
import './Bubble.css';

export type Position = 'left' | 'right';

interface Props {
    message: Message;
    position: Position;
    style?: object;
    avatar?: string | null;
}

const Bubble: React.FC<Props> = ({ message, position, style, avatar }) => {
    return (
        <div className={position === 'left' ? 'chat-bubble__wrapper chat-bubble--left' : 'chat-bubble__wrapper chat-bubble--right'}>
            {avatar
                ? <img src={avatar} alt="avatar" className="chat-bubble__avatar" />
                : <div style={{  marginLeft: '30px' }}></div>
            }
            <div className="chat-bubble__content" style={style}>{message.text}</div>
        </div>
    );
}
export default Bubble;