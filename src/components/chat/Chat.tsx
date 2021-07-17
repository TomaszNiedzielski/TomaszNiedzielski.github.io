import React, { useState } from 'react';
import Header from '../header/Header';
import Body from '../body/Body';
import Input from '../input/Input';

import './Chat.css';
import Widget from '../widget/Widget';

export interface User {
    id: number | string;
    name?: string;
    avatar?: string;
}

export interface Message {
    text: string;
    createdAt: string;
    user: User;
}

interface Props {
    minimized?: boolean;
    messages: Message[];
    user: User;
    onSend: (message: Message) => void;
}

const Chat: React.FC<Props> = ({ minimized, messages, user, onSend }) => {
    const [isMinimized, setIsMinimized] = useState(minimized);

    if(isMinimized) {
        return <Widget onClick={() => setIsMinimized(false)} />;
    } else {
        return (
            <div className="chat-container">
                <Header
                    minimize={() => setIsMinimized(true)}
                />
                <Body
                    user={user}
                    messages={messages}
                />
                <Input
                    user={user}
                    onSend={(message: Message) => onSend(message)}
                />
            </div>
        );
    }
}
export default Chat;