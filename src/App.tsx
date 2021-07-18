import React, { useState, useEffect } from 'react';
import './App.css';
import Chat, { Message } from './components/chat/Chat';
import moment from 'moment';
import Moment from 'react-moment';

const fakeMessages: Message[] = [
    {
        text: 'Hello world!',
        createdAt: '2021-07-17 10:40:35',
        user: {
            id: 1
        }
    },
    {
        text: 'Hello, I am a bot!',
        createdAt: '2021-07-17 10:43:35',
        user: {
            id: 2,
            avatar: 'https://bodysize.org/wp-content/uploads/2018/01/Mia-Malkova-480x640.jpg'
        }
    },
    {
        text: 'My job is to respond to you!',
        createdAt: '2021-07-17 10:45:35',
        user: {
            id: 2,
            avatar: 'https://bodysize.org/wp-content/uploads/2018/01/Mia-Malkova-480x640.jpg'
        }
    }
]

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(fakeMessages);
    const [botMessage, setBotMessage] = useState<string>();

    const onSend = (message: Message) => {
        console.log(message);
        const updatedMessages = [...messages, message];
        setMessages(updatedMessages);
    }


    const onSendBotMessage = () => {
        if(!botMessage) return;

        console.log(botMessage);
        const updatedMessages: Message[] = [...messages, {
            text: botMessage,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            user: {
                id: 2,
                avatar: 'https://bodysize.org/wp-content/uploads/2018/01/Mia-Malkova-480x640.jpg'
            }
        }];
        setMessages(updatedMessages);
    }

    //sztuczna inteligencja script

    useEffect(() => {
        if(messages[messages.length-1].user.id !== 1) return;

        const lm = messages[messages.length-1].text;

        let updatedMessages: Message[] = [];
        let botMessage = 'Nie wiem co powiedzieć. Jestem tylko głupim botem.';

        if(lm === 'siema') {
            botMessage = 'Cześć';
        }

        if(lm === 'cześć' || lm === 'Cześć') {
            botMessage = 'Cześć';
        }

        if(lm === 'co tam' || lm === 'co tam?' || lm === 'co u ciebie' || lm === 'co u ciebie?') {
            botMessage = 'nic';
        }

        if(lm === 'Idziesz na spacer?') {
            botMessage = 'Pewnie! Kiedy?';
        }

        if(lm === 'Co lubisz jeść?') {
            botMessage = 'Najbardziej lubie jeść frytki i pić wódke.';
        }

        window.setTimeout(() => {
            updatedMessages = [...messages, {
                text: botMessage,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                user: {
                    id: 2,
                    avatar: 'https://bodysize.org/wp-content/uploads/2018/01/Mia-Malkova-480x640.jpg'
                }
            }];

            setMessages(updatedMessages);
        }, 1000);

    }, [messages]);

    // end

    return (
        <div className="App">
            {/* <div>
                <input
                    type="text"
                    value={botMessage}
                    onChange={e => setBotMessage(e.target.value)}
                />
                <button onClick={onSendBotMessage}>wyślij</button>
            </div> */}
            <Chat
                user={{ id: 1 }}
                minimized={false}
                messages={messages}
                onSend={(message: Message) => onSend(message)}
            />
        </div>
    );
}
export default App;