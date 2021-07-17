import React, { useRef, useEffect } from 'react';
import './Body.css';
import Bubble, { Position } from '../bubble/Bubble';
import { Message, User } from '../chat/Chat';

interface Props {
    messages: Message[];
    user: User;
}

const Body: React.FC<Props> = ({ messages, user }) => {
    let el = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        el.current.scrollIntoView();
    }, [messages]);

    const setStylesForLeftPositionedBubbles = (messages: Message[], i: number) => {
        let style;

        if(messages[i-1] && messages[i+1] && messages[i].user.id === messages[i+1].user.id && messages[i].user.id !== messages[i-1].user.id) {
            style = { borderRadius: '15px 15px 15px 0px' }
        } else if(messages[i-1] && messages[i+1] && messages[i].user.id === messages[i+1].user.id && messages[i].user.id === messages[i-1].user.id) {
            style = { borderRadius: '0px 15px 15px 0px' }
        } else if(messages[i-1] && messages[i+1] && messages[i].user.id === messages[i-1].user.id && messages[i].user.id !== messages[i+1].user.id) {
            style = { borderRadius: '0px 15px 15px 15px' }
        } else if(messages[i-1] && !messages[i+1] && messages[i].user.id === messages[i-1].user.id) {
            style = { borderRadius: '0px 15px 15px 15px' }
        }

        return style;
    }

    const setStylesForRightPositionedBubbles = (messages: Message[], i: number) => {
        let style;

        if(messages[i-1] && messages[i+1] && messages[i].user.id === messages[i+1].user.id && messages[i].user.id !== messages[i-1].user.id) {
            style = { borderRadius: '15px 15px 0px 15px' }
        } else if(messages[i-1] && messages[i+1] && messages[i].user.id === messages[i+1].user.id && messages[i].user.id === messages[i-1].user.id) {
            style = { borderRadius: '15px 0px 0px 15px' }
        } else if(messages[i-1] && messages[i+1] && messages[i].user.id === messages[i-1].user.id && messages[i].user.id !== messages[i+1].user.id) {
            style = { borderRadius: '15px 0px 15px 15px' }
        } else if(messages[i-1] && !messages[i+1] && messages[i].user.id === messages[i-1].user.id) {
            style = { borderRadius: '15px 0px 15px 15px' }
        }

        return style;
    }

    return (
        <div className="chat-body">
            {messages.map((message, i) => {
                let position: Position = 'left';
                let style;

                if(message.user.id === user.id) {
                    position = 'right';

                    style = setStylesForRightPositionedBubbles(messages, i);
                } else {
                    style = setStylesForLeftPositionedBubbles(messages, i);
                }

                return (
                    <div style={messages[i+1] && message.user.id !== messages[i+1].user.id ? { marginBottom: '8px' } : {}}>
                        <Bubble
                            message={message}
                            position={position}
                            style={style}
                            avatar={
                                position === 'left'
                                && (
                                    messages[i+1]
                                    && message.user.id !== messages[i+1].user.id
                                ) || (
                                    !messages[i+1]
                                )
                                ? message.user.avatar
                                : null
                            }
                        />
                    </div>
                );
            })}
            <div ref={el}></div>
        </div>
    );
}
export default Body;