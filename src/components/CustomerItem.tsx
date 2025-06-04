import React from 'react';
import { Customer } from '../types';
import Avatar from './Avatar';

interface CustomerItemProps {
  customer: Customer;
  selected: boolean;
  onClick: () => void;
  staffInfo?: string | null;
}

const CustomerItem: React.FC<CustomerItemProps> = ({ 
  customer, 
  selected, 
  onClick,
  staffInfo
}) => {
  return (
    <div 
      className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200
        ${selected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
      onClick={onClick}
    >
      <Avatar 
        initials={customer.avatar} 
        active={customer.active} 
        selected={selected}
        needsSupport={customer.needsSupport}
      />
      <div className="flex-1">
        <span className={`font-medium ${customer.active ? 'text-gray-800' : 'text-gray-500'}`}>
          {customer.name}
        </span>
        {staffInfo && (
          <p className={`text-sm ${staffInfo === 'Bạn' ? 'text-blue-600' : 'text-gray-500'}`}>
            {staffInfo}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerItem