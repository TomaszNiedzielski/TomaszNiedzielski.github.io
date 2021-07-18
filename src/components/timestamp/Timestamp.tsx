import React from 'react';
import './Timestamp.css';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/pl';

interface Props {
    date: string;
}

const Timestamp: React.FC<Props> = ({ date }) => {
    return (
        <div className="chat-timestamp">
            <Moment format="dd. o HH:mm">{moment(date)}</Moment>
        </div>
    );
}
export default Timestamp;