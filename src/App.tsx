import React, { useState, useEffect } from 'react';
import './App.css';
import Chat, { Message } from './components/chat/Chat';
import './components/index.css';
import moment from 'moment';
import 'moment/locale/pl';
import favicon from './favicon.png';

const fakeMessages: Message[] = [
    {
        id: 1,
        text: 'Hello',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        user: {
            id: 1,
            avatar: 'https://bodysize.org/wp-content/uploads/2018/01/Mia-Malkova-480x640.jpg'
        }
    },
    {
        id: 2,
        text: 'Hello',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        user: {
            id: 2,
            avatar: 'https://lastfm.freetls.fastly.net/i/u/avatar170s/3095596d7697f67201a864dc5b2d8bf6'
        }
    },
    {
        id: 2,
        text: 'How can i help you?',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        user: {
            id: 2,
            avatar: 'https://lastfm.freetls.fastly.net/i/u/avatar170s/3095596d7697f67201a864dc5b2d8bf6'
        }
    }
]

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(fakeMessages);

    const [leftIsTyping, setLeftIsTyping] = useState<boolean>(false);
    const [rightIsTyping, setRightIsTyping] = useState<boolean>(false);

    const [leftMessageValue, setLeftMessageValue] = useState<string>();
    const [rightMessageValue, setRightMessageValue] = useState<string>();

    const onSend = (message: Message) => {
        const updatedMessages = [...messages, message];
        setMessages(updatedMessages);
    }

    useEffect(() => {
        if(!leftMessageValue) {
            setLeftIsTyping(false);
            return;
        }

        setLeftIsTyping(true);

        const timer = window.setTimeout(() => {
            setLeftIsTyping(false)
        }, 1500);

        return () => {
            window.clearTimeout(timer);
        }
    }, [leftMessageValue]);

    useEffect(() => {
        if(!rightMessageValue) {
            setRightIsTyping(false);
            return;
        }

        setRightIsTyping(true);

        const timer = window.setTimeout(() => {
            setRightIsTyping(false)
        }, 1500);

        return () => {
            window.clearTimeout(timer);
        }
    }, [rightMessageValue]);

    return (
        <div className="App">
            <Chat
                title="Kimmy Granger"
                headerAvatar="https://lastfm.freetls.fastly.net/i/u/avatar170s/3095596d7697f67201a864dc5b2d8bf6"
                user={{
                    id: 1,
                    avatar: 'https://bodysize.org/wp-content/uploads/2018/01/Mia-Malkova-480x640.jpg'
                }}
                minimized={false}
                messages={messages}
                onSend={(message: Message) => onSend(message)}
                isTyping={rightIsTyping}
                onInputTextChanged={value => setLeftMessageValue(value)}
                containerStyle={{
                    left: '20px',
                    boxShadow: '0 0 5px 4px #ad9ffd'
                }}
                widgetStyle={{ left: '20px' }}
                leftBubbleStyle={{
                    backgroundColor: '#eeedfe',
                }}
                rightBubbleStyle={{
                    backgroundColor: '#b140fe',
                }}
                backgroundColor="#cdc4ff"
                headerStyle={{
                    backgroundColor: '#ad9ffd',
                    boxShadow: 'none'
                }}
                inputToolbarStyle={{
                    backgroundColor: '#cdc4ff'
                }}
                inputStyle={{
                    borderRadius: '50px',
                    margin: '10px 0',
                    padding: '14px 18px',
                }}
            />

            <Chat
                title="Mia Malkova"
                headerAvatar="https://bodysize.org/wp-content/uploads/2018/01/Mia-Malkova-480x640.jpg"
                user={{
                    id: 2,
                    avatar: 'https://lastfm.freetls.fastly.net/i/u/avatar170s/3095596d7697f67201a864dc5b2d8bf6'
                }}
                minimized={false}
                messages={messages}
                onSend={(message: Message) => onSend(message)}
                isTyping={leftIsTyping}
                onInputTextChanged={value => setRightMessageValue(value)}
            />
        </div>
    );
}
export default App;