import React, { useState } from 'react';
import { Customer, Staff } from '../types';
import CustomerItem from './CustomerItem';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CustomerListProps {
  customers: Customer[];
  selectedCustomerId: string;
  onSelectCustomer: (customerId: string) => void;
  currentStaff: Staff;
}

const CustomerList: React.FC<CustomerListProps> = ({ 
  customers, 
  selectedCustomerId, 
  onSelectCustomer,
  currentStaff
}) => {
  const [needsSupportExpanded, setNeedsSupportExpanded] = useState(true);
  const [activeExpanded, setActiveExpanded] = useState(true);
  const [inactiveExpanded, setInactiveExpanded] = useState(true);
  const [displayLimit, setDisplayLimit] = useState(5);

  const needsSupportCustomers = customers.filter(c => c.active && c.needsSupport);
  const activeCustomers = customers.filter(c => c.active && !c.needsSupport);
  const inactiveCustomers = customers.filter(c => !c.active);

  const displayedNeedsSupportCustomers = needsSupportCustomers.slice(0, displayLimit);
  const hasMoreToLoad = needsSupportCustomers.length > displayLimit;

  const getStaffName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer?.assignedTo === currentStaff.id ? 'Bạn' : 
           customer?.assignedTo ? 'Đang được hỗ trợ' : null;
  };

  const handleLoadMore = () => {
    setDisplayLimit(prev => prev + 5);
  };

  return (
    <div className="h-full flex flex-col border-r border-gray-200">
      <div className="p-4 border-b border-gray-200" style={{height:"73px"}}> 
        <h2 className="text-lg font-semibold text-gray-800">Nhân viên: Vũ Duy</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {needsSupportCustomers.length > 0 && (
          <div className="border-b border-gray-200">
            <div 
              className="flex items-center p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => setNeedsSupportExpanded(!needsSupportExpanded)}
            >
              {needsSupportExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              <span className="font-medium ml-1 text-orange-600">
                Cần xác nhận hỗ trợ ({needsSupportCustomers.length})
              </span>
            </div>
            
            {needsSupportExpanded && (
              <>
                {displayedNeedsSupportCustomers.map(customer => (
                  <CustomerItem
                    key={customer.id}
                    customer={customer}
                    selected={customer.id === selectedCustomerId}
                    onClick={() => onSelectCustomer(customer.id)}
                    staffInfo={getStaffName(customer.id)}
                  />
                ))}
                {hasMoreToLoad && (
                  <button
                    onClick={handleLoadMore}
                    className="w-full p-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  >
                    Xem thêm...
                  </button>
                )}
              </>
            )}
          </div>
        )}

        <div className="border-b border-gray-200">
          <div 
            className="flex items-center p-3 cursor-pointer hover:bg-gray-50"
            onClick={() => setActiveExpanded(!activeExpanded)}
          >
            {activeExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            <span className="font-medium ml-1">
              Đang hỗ trợ ({activeCustomers.length})
            </span>
          </div>
          
          {activeExpanded && activeCustomers.map(customer => (
            <CustomerItem
              key={customer.id}
              customer={customer}
              selected={customer.id === selectedCustomerId}
              onClick={() => onSelectCustomer(customer.id)}
              staffInfo={getStaffName(customer.id)}
            />
          ))}
        </div>
        
        <div>
          <div 
            className="flex items-center p-3 cursor-pointer hover:bg-gray-50"
            onClick={() => setInactiveExpanded(!inactiveExpanded)}
          >
            {inactiveExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            <span className="font-medium ml-1">
              Đã hỗ trợ ({inactiveCustomers.length})
            </span>
          </div>
          
          {inactiveExpanded && inactiveCustomers.map(customer => (
            <CustomerItem
              key={customer.id}
              customer={customer}
              selected={customer.id === selectedCustomerId}
              onClick={() => onSelectCustomer(customer.id)}
              staffInfo={getStaffName(customer.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerList;