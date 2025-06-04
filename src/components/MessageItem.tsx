import React from 'react';
import { Message } from '../types';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div 
      className={`mb-4 max-w-[80%] ${message.isCustomer ? 'self-start' : 'self-end'}`}
    >
      <div 
        className={`p-3 rounded-lg ${message.isCustomer 
          ? 'bg-gray-100 text-gray-800' 
          : 'bg-blue-500 text-white'
        }`}
      >
        {message.text}
      </div>
      <div 
        className={`text-xs mt-1 ${message.isCustomer 
          ? 'text-left text-gray-500' 
          : 'text-right text-gray-500'
        }`}
      >
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
};

export default MessageItem;