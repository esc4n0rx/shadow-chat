// components/MessageList.tsx

import React from 'react';
import MessageItem from './MessageItem';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: number;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
