"use client";

import React, { useEffect, useRef } from 'react';
import { Message } from '../types/types';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessageContent = (message: Message) => {
    if (message.messageType === 'text') {
      return <p>{message.text}</p>;
    } else if (message.messageType === 'file') {
      const blob = new Blob([message.fileData!], { type: message.fileType });
      const url = URL.createObjectURL(blob);

      if (message.fileType && message.fileType.startsWith('image/')) {
        return <img src={url} alt={message.fileName} className="max-w-xs max-h-64" />;
      } else {
        return (
          <a href={url} download={message.fileName} className="text-blue-500 underline">
            {message.fileName}
          </a>
        );
      }
    } else if (message.messageType === 'audio') {
      const blob = new Blob([message.fileData!], { type: message.fileType });
      const url = URL.createObjectURL(blob);

      return (
        <audio controls>
          <source src={url} type={message.fileType} />
          Seu navegador não suporta o elemento de áudio.
        </audio>
      );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <div className="font-bold">{message.user}</div>
          {renderMessageContent(message)}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
