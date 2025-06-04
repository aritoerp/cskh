import { Customer, Message, UserInfo, Staff } from '../types';

export const staff: Staff[] = [
  { id: 'staff1', name: 'Trần Thị A' },
  { id: 'staff2', name: 'Lê Văn B' },
  { id: 'staff3', name: 'Nguyễn Thị C' },
];

// Generate more customers needing support
const generateCustomers = (start: number, count: number, needsSupport: boolean = true): Customer[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `customer-${start + i}`,
    name: `Khách hàng ${start + i}`,
    avatar: `K${start + i}`,
    active: true,
    needsSupport,
  }));
};

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'NVA',
    active: true,
    needsSupport: true,
  },
  {
    id: '2',
    name: 'Phạm Văn C',
    avatar: 'PVC',
    active: true,
    assignedTo: 'staff1',
  },
  {
    id: '3',
    name: 'Lê Thị D',
    avatar: 'LTD',
    active: false,
  },
  ...generateCustomers(4, 15), // Add 15 more customers needing support
  ...generateCustomers(20, 5, false), // Add 5 more active customers being supported
];

export const messages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      customerId: '1',
      text: 'Chào bạn',
      timestamp: new Date(2023, 5, 15, 10, 30),
      isCustomer: true,
    },
    {
      id: '102',
      customerId: '1',
      text: 'Tôi cần hỗ trợ về hóa đơn.',
      timestamp: new Date(2023, 5, 15, 10, 31),
      isCustomer: true,
    },
  ],
  '2': [
    {
      id: '201',
      customerId: '2',
      text: 'Chào bạn',
      timestamp: new Date(2023, 5, 15, 11, 30),
      isCustomer: true,
    },
    {
      id: '202',
      customerId: '2',
      text: 'Tôi cần hỗ trợ về khai báo thuế.',
      timestamp: new Date(2023, 5, 15, 11, 31),
      isCustomer: true,
    },
    {
      id: '203',
      customerId: '2',
      text: 'Xin chào!',
      timestamp: new Date(2023, 5, 15, 11, 32),
      isCustomer: false,
      staffName: 'Trần Thị A',
    },
    {
      id: '204',
      customerId: '2',
      text: 'Chúng tôi có thể giúp gì cho bạn?',
      timestamp: new Date(2023, 5, 15, 11, 33),
      isCustomer: false,
      staffName: 'Trần Thị A',
    },
  ],
  '3': [
    {
      id: '301',
      customerId: '3',
      text: 'Tôi cần trợ giúp về đăng ký kinh doanh',
      timestamp: new Date(2023, 5, 15, 9, 30),
      isCustomer: true,
    },
  ],
};

// Generate mock user info for all customers
export const userInfos: Record<string, UserInfo> = Object.fromEntries(
  customers.map(customer => [
    customer.id,
    {
      customerId: customer.id,
      taxCode: Math.random().toString().slice(2, 12),
      companyName: `Công ty ${customer.name}`,
      notes: 'Khách hàng mới cần hỗ trợ.',
    }
  ])
);