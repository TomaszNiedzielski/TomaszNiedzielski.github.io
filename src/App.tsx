import React, { useState, useEffect } from 'react';
import './App.css';
import Chat, { Message } from './components/chat/Chat';
import moment from 'moment';
import 'moment/locale/pl';

const fakeMessages: Message[] = [
    {
        text: 'Hello world!',
        createdAt: '2021-07-17 10:40:35',
        user: {
            id: 1
        }
    },
    {
        text: 'Cześć w czym mogę Ci pomóc?',
        createdAt: '2021-07-17 10:43:35',
        user: {
            id: 2,
            avatar: 'https://bodysize.org/wp-content/uploads/2018/01/Mia-Malkova-480x640.jpg'
        }
    },
    {
        text: 'My job is to respond to you!',
        createdAt: '2021-07-17 10:49:35',
        user: {
            id: 3,
            avatar: 'https://pbs.twimg.com/media/DUZ1jCIWkAA62dc.jpg'
        }
    }
]

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(fakeMessages);
    const [botMessage, setBotMessage] = useState<string>();
    const [isTyping, setIsTyping] = useState(false);

    const onSend = (message: Message) => {
        console.log(message);
        const updatedMessages = [...messages, message];
        setMessages(updatedMessages);
    }

    const onSendBotMessage = () => {
        if(!botMessage) return;

        const updatedMessages: Message[] = [...messages, {
            text: botMessage,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            user: {
                id: 2,
                avatar: 'https://bodysize.org/wp-content/uploads/2018/01/Mia-Malkova-480x640.jpg'
            }
        }];
        setBotMessage('');
        setMessages(updatedMessages);
        setIsTyping(false);
    }

    useEffect(() => {
        if(!botMessage) {
            setIsTyping(false);
            return;
        }

        setIsTyping(true);
        const timer = window.setTimeout(() => {
            setIsTyping(false);
        }, 1500);

        return () => {
            window.clearTimeout(timer);
        }
    }, [botMessage]);

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            onSendBotMessage();
        }
    }
console.log(messages);
    //sztuczna inteligencja script

    useEffect(() => {
        if(messages[messages.length-1]?.user.id !== 1) return;

        let timer1: any;

        const timer = window.setTimeout(() => {

            setIsTyping(true);

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
                botMessage = 'pizze';
            }

            if(lm === 'Czym się interesujesz?') {
                botMessage = 'Netflix, podróże, muzyka.';
            }

            timer1 = window.setTimeout(() => {
                updatedMessages = [...messages, {
                    text: botMessage,
                    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                    user: {
                        id: 2,
                        avatar: 'https://bodysize.org/wp-content/uploads/2018/01/Mia-Malkova-480x640.jpg'
                    }
                }];

                setMessages(updatedMessages);
                setIsTyping(false);
            }, 1000);

        }, 500);

        return () => {
            window.clearTimeout(timer);
            window.clearTimeout(timer1);
        }
    }, [messages]);

    // end

    return (
        <div className="App">
            <div className="friend-input">
                <input
                    type="text"
                    value={botMessage}
                    onChange={e => setBotMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={onSendBotMessage}>wyślij</button>
            </div>
            <Chat
                title="Asystent zakupu - p0lka"
                headerAvatar="https://bodysize.org/wp-content/uploads/2018/01/Mia-Malkova-480x640.jpg"
                user={{ id: 1 }}
                minimized={false}
                messages={messages}
                onSend={(message: Message) => onSend(message)}
                isTyping={isTyping}
                onInputTextChanged={(value) => {console.log(value)}}
            />
        </div>
    );
}
export default App;