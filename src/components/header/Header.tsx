import React from 'react';
import './Header.css';

interface Props {
    minimize: () => void;
}

const Header: React.FC<Props> = ({ minimize }) => {
    return (
        <header className="chat-header">
            <div className="chat-header__title">
                <b>Bot Demo</b>
            </div>
            <img src="/assets/minimize.png" alt="minimize" className="chat-header__minimize" onClick={minimize} />
        </header>
    );
}
export default Header;