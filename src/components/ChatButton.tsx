import React from 'react';
import '../styles/ChatWidget.css';

interface ChatButtonProps {
  onClick: () => void;
  showNotification?: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, showNotification = false }) => {
  return (
    <button className="chat-trigger" onClick={onClick}>
      <i className="fa-solid fa-comment-dots"></i>
      {showNotification && <span className="notification-dot"></span>}
    </button>
  );
};

export default ChatButton; 