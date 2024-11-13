// components/MessageInput.tsx

"use client";

import React, { useState } from 'react';
import { FaSmile } from 'react-icons/fa';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import FileUpload from './FileUpload';

interface MessageInputProps {
  onSendMessage: (messageText: string) => void;
  onSendFile: (file: File) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onSendFile }) => {
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addEmoji = (emoji: any) => {
    setMessageText((prev) => prev + emoji.native);
  };

  const handleFileSelected = (file: File) => {
    onSendFile(file);
  };

  return (
    <div className="p-4 bg-gray-800 flex relative">
      <button
        onClick={() => setShowEmojiPicker((val) => !val)}
        className="text-white mr-2"
      >
        <FaSmile size={24} />
      </button>
      {showEmojiPicker && (
        <div className="absolute bottom-12 left-0 z-10">
          <Picker data={data} onEmojiSelect={addEmoji} theme="dark" />
        </div>
      )}
      <FileUpload onFileSelected={handleFileSelected} />
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite sua mensagem"
        className="flex-grow p-2 bg-gray-700 text-white rounded-l"
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-600 text-white py-2 px-4 rounded-r hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </div>
  );
};

export default MessageInput;
