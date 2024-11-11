// components/MessageInput.tsx

import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (messageText: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-gray-800 flex">
      <input
        type="text"
        placeholder="Digite sua mensagem..."
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        className="flex-1 p-2 rounded bg-gray-700 text-white"
      />
      <button
        onClick={handleSend}
        className="ml-2 bg-blue-600 p-2 rounded text-white hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </div>
  );
};

export default MessageInput;
