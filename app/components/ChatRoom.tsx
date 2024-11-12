// components/ChatRoom.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateRandomName } from '../utils/randomNameGenerator';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/types';
import { getSocket } from '../utils/socket';
import {
  encryptMessage,
  decryptMessage,
  generateKey,
  importKey,
  exportKey,
} from '../utils/encryption';

interface ChatRoomProps {
  roomId: string;
  roomName?: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId, roomName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [userName] = useState<string>(() => generateRandomName());
  const router = useRouter();

  useEffect(() => {
    const setupEncryptionKey = async () => {
      let keyData = sessionStorage.getItem(`encryptionKey-${roomId}`);
      if (keyData) {
        const importedKey = await importKey(JSON.parse(keyData));
        setEncryptionKey(importedKey);
      } else {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const keyString = params.get('key');

        if (keyString) {
          const exportedKey = JSON.parse(decodeURIComponent(keyString));
          const importedKey = await importKey(exportedKey);
          sessionStorage.setItem(`encryptionKey-${roomId}`, JSON.stringify(exportedKey));
          setEncryptionKey(importedKey);
        } else {
          alert('Chave de criptografia não encontrada. Certifique-se de usar o link correto.');
          router.push('/');
        }
      }
    };

    setupEncryptionKey();
  }, [roomId, router]);

  useEffect(() => {
    if (!encryptionKey) return;

    const socket = getSocket(roomId);

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: 'join',
          user: userName,
        })
      );
    };

    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        const iv = new Uint8Array(data.iv);
        const encryptedData = new Uint8Array(data.encryptedData).buffer;
        const decryptedText = await decryptMessage(encryptedData, encryptionKey, iv);

        const newMessage: Message = {
          id: data.id,
          user: data.user,
          text: decryptedText,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, newMessage]);

        setTimeout(() => {
          setMessages((prev) => prev.filter((msg) => msg.id !== data.id));
        }, 15000);
      }
    };

    socket.onclose = () => {
      console.log('Conexão fechada');
    };

    return () => {
      socket.send(
        JSON.stringify({
          type: 'leave',
          user: userName,
        })
      );
      socket.close();
    };
  }, [encryptionKey, roomId, userName]);

  const sendMessage = async (messageText: string) => {
    if (!encryptionKey) return;

    const { encryptedData, iv } = await encryptMessage(messageText, encryptionKey);
    const messageId = uuidv4();

    const socket = getSocket(roomId);

    const messageData = {
      type: 'message',
      roomId,
      id: messageId,
      user: userName,
      encryptedData: Array.from(new Uint8Array(encryptedData)),
      iv: Array.from(iv),
    };

    socket.send(JSON.stringify(messageData));

    const newMessage: Message = {
      id: messageId,
      user: userName,
      text: messageText,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    }, 15000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="p-4 bg-gray-800 flex justify-between items-center">
        <h2 className="text-xl">{roomName || 'Sala de Chat'}</h2>
        <span>{userName}</span>
      </header>
      <div className="p-2 text-center bg-gray-800">
        Código da sala: <span className="font-mono">{roomId}</span>
      </div>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;
