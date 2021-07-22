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
    title?: string;
    minimized?: boolean;
    messages: Message[];
    user: User;
    onSend: (message: Message) => void;
    isTyping?: boolean;
    onInputTextChanged?: (value: string) => void;
    headerAvatar?: string;
}

const Chat: React.FC<Props> = ({ title, minimized, messages, user, onSend, isTyping, onInputTextChanged, headerAvatar }) => {
    const [isMinimized, setIsMinimized] = useState(minimized);

    if(isMinimized) {
        return <Widget onClick={() => setIsMinimized(false)} />;
    } else {
        return (
            <div className="chat-container">
                <Header
                    title={title}
                    minimize={() => setIsMinimized(true)}
                    headerAvatar={headerAvatar}
                />
                <Body
                    user={user}
                    messages={messages}
                    isTyping={isTyping}
                />
                <Input
                    user={user}
                    onSend={(message: Message) => onSend(message)}
                    onInputTextChanged={onInputTextChanged}
                />
            </div>
        );
    }
}
export default Chat;