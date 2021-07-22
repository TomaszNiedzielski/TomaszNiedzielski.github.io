import React, { useState, useEffect, useRef } from 'react';
import { Message, User } from '../chat/Chat';
import './Input.css';
import moment from 'moment';

interface Props {
    onSend: (message: Message) => void;
    user: User;
    onInputTextChanged?: (value: string) => void;
}

const Input: React.FC<Props> = ({ user, onSend, onInputTextChanged }) => {
    const [value, setValue] = useState<string>('');
    const [message, setMessage] = useState<Message>();
    const el = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        onInputTextChanged && onInputTextChanged(value);
        setMessage({
            text: value,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            user: user
        });
    }, [value]);
    
    const send = () => {
        if(message) {
            onSend(message);
        }
        setValue('');
        el.current.focus();
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
                ref={el}
            />
            {value.length > 0 && <img src="/assets/send.png" alt="send" onClick={send} />}
        </div>
    );
}
export default Input;