import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import ConversationPanel from './components/ConversationPanel';
import UserInfo from './components/UserInfo';
import { customers, messages, userInfos, staff } from './data/mockData';
import { Customer, Message } from './types';

function App() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[1].id);
  const [customerData, setCustomerData] = useState(customers);
  const [messageData, setMessageData] = useState(messages);
  
  // For demo purposes, we'll use the first staff member
  const currentStaff = staff[0];

  const selectedCustomer = customerData.find(c => c.id === selectedCustomerId) || null;
  const selectedMessages = selectedCustomerId ? messageData[selectedCustomerId] || [] : [];
  const selectedUserInfo = selectedCustomerId ? userInfos[selectedCustomerId] || null : null;

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
  };

  const handleSendMessage = (text: string) => {
    if (!selectedCustomerId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      customerId: selectedCustomerId,
      text,
      timestamp: new Date(),
      isCustomer: false,
      staffName: currentStaff.name,
    };

    setMessageData(prev => ({
      ...prev,
      [selectedCustomerId]: [...(prev[selectedCustomerId] || []), newMessage],
    }));
  };

  const handleEndConversation = () => {
    if (!selectedCustomerId) return;

    setCustomerData(prev => 
      prev.map(customer => 
        customer.id === selectedCustomerId 
          ? { ...customer, active: false, assignedTo: undefined } 
          : customer
      )
    );
  };

  const handleAcceptSupport = () => {
    if (!selectedCustomerId) return;

    setCustomerData(prev => 
      prev.map(customer => 
        customer.id === selectedCustomerId 
          ? { ...customer, needsSupport: false, assignedTo: currentStaff.id } 
          : customer
      )
    );
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/4">
          <CustomerList 
            customers={customerData}
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={handleSelectCustomer}
            currentStaff={currentStaff}
          />
        </div>
        
        <div className="w-2/4">
          <ConversationPanel 
            customer={selectedCustomer}
            messages={selectedMessages}
            onSendMessage={handleSendMessage}
            onEndConversation={handleEndConversation}
            onAcceptSupport={handleAcceptSupport}
            currentStaff={currentStaff}
          />
        </div>
        
        <div className="w-1/4">
          <UserInfo userInfo={selectedUserInfo} />
        </div>
      </div>
    </div>
  );
}

export default App;