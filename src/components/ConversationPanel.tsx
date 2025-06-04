import React, { useRef, useEffect } from 'react';
import { Customer, Staff, Message } from '../types';
import MessageItem from './MessageItem';
import Avatar from './Avatar';
import { Send, Pause, CheckCircle2, PanelRightClose, PanelRightOpen } from 'lucide-react';

interface ConversationPanelProps {
  customer: Customer | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onEndConversation: () => void;
  onAcceptSupport: () => void;
  currentStaff: Staff;
  onToggleUserInfo: () => void;
  isUserInfoVisible: boolean;
}

const ConversationPanel: React.FC<ConversationPanelProps> = ({ 
  customer, 
  messages, 
  onSendMessage,
  onEndConversation,
  onAcceptSupport,
  currentStaff,
  onToggleUserInfo,
  isUserInfoVisible
}) => {
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!customer) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 text-gray-500">
        Chọn một khách hàng để bắt đầu hội thoại
      </div>
    );
  }

  const canInteract = (customer.assignedTo === currentStaff.id);

  const showEndConversationButton = customer.active && !customer.needsSupport;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar 
            initials={customer.avatar} 
            size="md" 
            active={customer.active}
            needsSupport={customer.needsSupport}
          />
          <h2 className="text-lg font-semibold text-gray-800">{customer.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleUserInfo}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label={isUserInfoVisible ? 'Ẩn thông tin' : 'Hiện thông tin'}
          >
            {isUserInfoVisible ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
          </button>
          {customer.needsSupport ? (
            <button 
              className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 flex items-center gap-2 transition-colors duration-200 text-white"
              onClick={onAcceptSupport}
            >
              <CheckCircle2 size={16} />
              Xác nhận hỗ trợ
            </button>
          ) : showEndConversationButton && (customer.assignedTo === currentStaff.id) && (
            <button 
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-2 transition-colors duration-200 text-gray-700"
              onClick={onEndConversation}
            >
              <Pause size={16} />
              Kết thúc hội thoại
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        <div className="flex flex-col">
          {messages.map(message => (
            <MessageItem key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        {canInteract ? (
          <div className="flex items-center gap-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className={`p-3 rounded-lg ${newMessage.trim() 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-200 text-gray-400'
              } transition-colors duration-200`}
            >
              <Send size={20} />
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Khách hàng đang được hỗ trợ bởi nhân viên khác hoặc bạn cần xác nhận để hỗ trợ
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationPanel;