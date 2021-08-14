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
            avatar: 'https://falmed.pl/wp-content/uploads/2015/05/team1.jpg'
        }
    },
    {
        id: 2,
        text: 'Hello',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        user: {
            id: 2,
            avatar: 'https://iot2020.pl/wp-content/uploads/2015/04/speaker-1-v2.jpg'
        }
    },
    {
        id: 3,
        text: 'How can i help you?',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        user: {
            id: 2,
            avatar: 'https://iot2020.pl/wp-content/uploads/2015/04/speaker-1-v2.jpg'
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
                title="Customized chat window"
                headerAvatar="https://iot2020.pl/wp-content/uploads/2015/04/speaker-1-v2.jpg"
                user={{
                    id: 1,
                    avatar: 'https://falmed.pl/wp-content/uploads/2015/05/team1.jpg'
                }}
                minimized={false}
                messages={messages}
                onSend={(message: Message) => onSend(message)}
                isTyping={rightIsTyping}
                onInputTextChanged={value => setLeftMessageValue(value)}
                containerStyle={{
                    left: '20px',
                    boxShadow: '6px 6px 5px 4px #ccc'
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
                title="Default chat window"
                headerAvatar="https://falmed.pl/wp-content/uploads/2015/05/team1.jpg"
                user={{
                    id: 2,
                    avatar: 'https://iot2020.pl/wp-content/uploads/2015/04/speaker-1-v2.jpg'
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