import React, { useEffect, useState } from 'react';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: number;
}

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsVisible(false), 1000);
    }, 14000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`p-2 mb-2 rounded bg-gray-800 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0 transform -translate-y-2' : 'opacity-100'
      }`}
    >
      <strong>{message.user}:</strong> {message.text}
    </div>
  );
};

export default MessageItem;
