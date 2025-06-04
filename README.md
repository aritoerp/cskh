# Customer Support Management Interface - WebSocket Documentation

## WebSocket Events Structure

### Connection Events

#### Client -> Server
```typescript
// Authenticate staff member
socket.emit('staff:auth', {
  staffId: string,
  token: string
});

// Subscribe to customer updates
socket.emit('staff:subscribe', {
  staffId: string
});
```

#### Server -> Client
```typescript
// Authentication response
socket.emit('staff:auth:response', {
  success: boolean,
  error?: string
});

// Staff status update
socket.emit('staff:status', {
  online: boolean,
  activeChats: number
});
```

### Customer Management Events

#### Client -> Server
```typescript
// Accept customer support request
socket.emit('customer:accept', {
  customerId: string,
  staffId: string
});

// End customer support session
socket.emit('customer:end', {
  customerId: string,
  staffId: string
});

// Load customer history
socket.emit('customer:history', {
  customerId: string
});
```

#### Server -> Client
```typescript
// New customer needing support
socket.emit('customer:new', {
  customer: {
    id: string,
    name: string,
    avatar: string,
    active: boolean,
    needsSupport: boolean,
    assignedTo?: string
  }
});

// Customer status update
socket.emit('customer:update', {
  customerId: string,
  updates: {
    active?: boolean,
    needsSupport?: boolean,
    assignedTo?: string
  }
});

// Customer history response
socket.emit('customer:history:response', {
  customerId: string,
  history: {
    messages: Array<{
      id: string,
      customerId: string,
      text: string,
      timestamp: Date,
      isCustomer: boolean,
      staffName?: string
    }>,
    userInfo: {
      customerId: string,
      taxCode: string,
      companyName: string,
      notes: string
    }
  }
});
```

### Messaging Events

#### Client -> Server
```typescript
// Send message to customer
socket.emit('message:send', {
  customerId: string,
  staffId: string,
  text: string
});

// Staff is typing indicator
socket.emit('message:typing', {
  customerId: string,
  staffId: string,
  isTyping: boolean
});
```

#### Server -> Client
```typescript
// New message received
socket.emit('message:new', {
  message: {
    id: string,
    customerId: string,
    text: string,
    timestamp: Date,
    isCustomer: boolean,
    staffName?: string
  }
});

// Typing indicator update
socket.emit('message:typing:update', {
  customerId: string,
  isCustomer: boolean,
  isTyping: boolean
});
```

### Error Handling

#### Server -> Client
```typescript
// Generic error event
socket.emit('error', {
  code: string,
  message: string,
  context?: any
});
```

## Implementation Notes

1. Authentication
   - Staff members must authenticate before accessing any features
   - Token should be included in all subsequent requests
   - Server validates token on each event

2. Real-time Updates
   - Server pushes updates for customer status changes
   - Typing indicators have a debounce of 300ms
   - Messages are delivered in real-time with timestamps

3. Error Handling
   - All events should include error handling
   - Connection errors trigger automatic reconnection
   - Failed messages should be queued for retry

4. Data Persistence
   - All messages are stored in the database
   - Customer history includes past conversations
   - Staff actions are logged for auditing

5. Performance Considerations
   - Implement pagination for message history
   - Use compression for large payloads
   - Handle reconnection gracefully

## Example Usage

```typescript
// Initialize socket connection
const socket = io('SERVER_URL', {
  auth: {
    token: 'STAFF_AUTH_TOKEN'
  }
});

// Handle connection
socket.on('connect', () => {
  // Authenticate staff
  socket.emit('staff:auth', {
    staffId: 'staff1',
    token: 'AUTH_TOKEN'
  });
});

// Listen for new customers
socket.on('customer:new', (data) => {
  // Update UI with new customer
});

// Send message
socket.emit('message:send', {
  customerId: 'customer1',
  staffId: 'staff1',
  text: 'Hello, how can I help you?'
});

// Handle new messages
socket.on('message:new', (data) => {
  // Update chat UI with new message
});
```