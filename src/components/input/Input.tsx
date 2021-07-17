import React, { useState, useEffect } from 'react';
import { Message, User } from '../chat/Chat';
import './Input.css';

interface Props {
    onSend: (message: Message) => void;
    user: User
}

const Input: React.FC<Props> = ({ user, onSend }) => {
    const [value, setValue] = useState<string>('');
    const [message, setMessage] = useState<Message>();

    useEffect(() => {
        setMessage({
            text: value,
            createdAt: '15-07-2021 12:12:12',
            user: user
        });
    }, [value]);
    
    const send = () => {
        if(message) {
            onSend(message);
        }
        setValue('');
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            send();
        }
    }

    return (
        <div className="chat-input">
            <input
                type="text"
                placeholder="Type a message..."
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            {value.length > 0 && <img src="/assets/send.png" alt="send" onClick={send} />}
        </div>
    );
}
export default Input;