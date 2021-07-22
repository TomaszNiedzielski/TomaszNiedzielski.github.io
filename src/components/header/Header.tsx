import React from 'react';
import './Header.css';

interface Props {
    title?: string;
    minimize: () => void;
    headerAvatar?: string
}

const Header: React.FC<Props> = ({ title, minimize, headerAvatar }) => {
    return (
        <header className="chat-header">
            <div className="d-flex align-items-center">
                <div className="chat-header__avatar">
                    <img src={headerAvatar} alt="avatar" />
                </div>
                <div className="chat-header__title">{title ? title : 'Bot Demo'}</div>
            </div>
            <img src="/assets/minimize.png" alt="minimize" className="chat-header__minimize" onClick={minimize} />
        </header>
    );
}
export default Header;