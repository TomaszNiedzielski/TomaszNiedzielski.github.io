import React, { useEffect } from 'react';
import './Body.css';
import Bubble, { Position } from '../bubble/Bubble';
import { Message, User } from '../chat/Chat';
import moment from 'moment';
import Timestamp from '../timestamp/Timestamp';

interface Props {
    messages: Message[];
    user: User;
}

const Body: React.FC<Props> = ({ messages, user }) => {
    const el = React.useRef() as React.MutableRefObject<HTMLDivElement>;

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

                console.log('licz');
                let isTimeStamp = true;
                if(messages[i-1]) {
                    const diff = moment(message.createdAt).diff(moment(messages[i-1].createdAt), 'minutes');
                    if(diff < 5) {
                        isTimeStamp = false;
                    }
                    console.log(diff);
                }

                return (
                    <div style={messages[i+1] ? (message.user.id !== messages[i+1].user.id ? { marginBottom: '8px' } : {}) : { marginBottom: '8px' }}>
                        {isTimeStamp ? <Timestamp date={message.createdAt} /> : null}
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