export interface Customer {
  id: string;
  name: string;
  avatar: string;
  active: boolean;
  assignedTo?: string; // Staff member handling this customer
  needsSupport?: boolean; // Indicates if customer needs initial support
}

export interface Message {
  id: string;
  customerId: string;
  text: string;
  timestamp: Date;
  isCustomer: boolean;
  staffName?: string; // Name of staff member who sent the message
}

export interface UserInfo {
  customerId: string;
  taxCode: string;
  companyName: string;
  notes: string;
}

export interface Staff {
  id: string;
  name: string;
}