"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { generateRandomName } from '../utils/randomNameGenerator';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/types';
import { getSocket } from '../utils/socket';
import {
  encryptMessage,
  decryptMessage,
  importKey,
} from '../utils/encryption';

interface ChatRoomProps {
  roomId: string;
  roomName?: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId, roomName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [exportedKey, setExportedKey] = useState<JsonWebKey | null>(null);
  const [userName] = useState<string>(() => generateRandomName());
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const setupEncryptionKey = async () => {
      let keyData = sessionStorage.getItem(`encryptionKey-${roomId}`);
      if (keyData) {
        const exportedKey = JSON.parse(keyData);
        const importedKey = await importKey(exportedKey);
        setEncryptionKey(importedKey);
        setExportedKey(exportedKey);
      } else {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const keyString = params.get('key');

        if (keyString) {
          const exportedKey = JSON.parse(decodeURIComponent(keyString));
          const importedKey = await importKey(exportedKey);
          sessionStorage.setItem(`encryptionKey-${roomId}`, JSON.stringify(exportedKey));
          setEncryptionKey(importedKey);
          setExportedKey(exportedKey);
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
        const messageType = data.messageType;

        if (messageType === 'text') {
          const decryptedText = await decryptMessage(encryptedData, encryptionKey, iv);

          const newMessage: Message = {
            id: data.id,
            user: data.user,
            text: decryptedText as string,
            timestamp: Date.now(),
            messageType: 'text',
          };
          setMessages((prev) => [...prev, newMessage]);

          setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.id !== data.id));
          }, 15000);
        } else if (messageType === 'file') {
          const decryptedData = await decryptMessage(encryptedData, encryptionKey, iv, 'ArrayBuffer');

          const newMessage: Message = {
            id: data.id,
            user: data.user,
            fileName: data.fileName,
            fileType: data.fileType,
            fileData: decryptedData as ArrayBuffer,
            timestamp: Date.now(),
            messageType: 'file',
          };
          setMessages((prev) => [...prev, newMessage]);

          setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.id !== data.id));
          }, 15000);
        } else if (messageType === 'audio') {
          const decryptedData = await decryptMessage(encryptedData, encryptionKey, iv, 'ArrayBuffer');

          const newMessage: Message = {
            id: data.id,
            user: data.user,
            fileName: data.fileName,
            fileType: data.fileType,
            fileData: decryptedData as ArrayBuffer,
            timestamp: Date.now(),
            messageType: 'audio',
          };
          setMessages((prev) => [...prev, newMessage]);

          setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.id !== data.id));
          }, 15000);
        }
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
      messageType: 'text',
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
      messageType: 'text',
    };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    }, 15000);
  };

  const sendFile = async (file: File) => {
    if (!encryptionKey) return;

    if (file.size > 5 * 1024 * 1024) { // Limite de 5 MB
      alert('O arquivo é muito grande. O tamanho máximo permitido é de 5 MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const { encryptedData, iv } = await encryptMessage(arrayBuffer, encryptionKey);

      const messageId = uuidv4();

      const socket = getSocket(roomId);

      const messageData = {
        type: 'message',
        messageType: 'file',
        roomId,
        id: messageId,
        user: userName,
        fileName: file.name,
        fileType: file.type,
        encryptedData: Array.from(new Uint8Array(encryptedData)),
        iv: Array.from(iv),
      };

      socket.send(JSON.stringify(messageData));

      const newMessage: Message = {
        id: messageId,
        user: userName,
        fileName: file.name,
        fileType: file.type,
        fileData: arrayBuffer,
        timestamp: Date.now(),
        messageType: 'file',
      };
      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      }, 15000);
    };

    reader.readAsArrayBuffer(file);
  };

  const sendAudio = async (audioBlob: Blob) => {
    if (!encryptionKey) return;

    if (audioBlob.size > 5 * 1024 * 1024) { // Limite de 5 MB
      alert('O áudio é muito grande. O tamanho máximo permitido é de 5 MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const { encryptedData, iv } = await encryptMessage(arrayBuffer, encryptionKey);

      const messageId = uuidv4();

      const socket = getSocket(roomId);

      const messageData = {
        type: 'message',
        messageType: 'audio',
        roomId,
        id: messageId,
        user: userName,
        fileName: 'audio.wav', // Nome padrão, pode ser ajustado conforme necessário
        fileType: audioBlob.type,
        encryptedData: Array.from(new Uint8Array(encryptedData)),
        iv: Array.from(iv),
      };

      socket.send(JSON.stringify(messageData));

      const newMessage: Message = {
        id: messageId,
        user: userName,
        fileName: 'audio.wav',
        fileType: audioBlob.type,
        fileData: arrayBuffer,
        timestamp: Date.now(),
        messageType: 'audio',
      };
      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      }, 15000);
    };

    reader.readAsArrayBuffer(audioBlob);
  };

  const getRoomLink = () => {
    if (!exportedKey) return '';
    const keyString = encodeURIComponent(JSON.stringify(exportedKey));
    const currentUrl = window.location.origin;
    const roomNameParam = roomName ? `?name=${encodeURIComponent(roomName)}` : '';
    return `${currentUrl}/room/${roomId}${roomNameParam}#key=${keyString}`;
  };

  const copyRoomLink = () => {
    const link = getRoomLink();
    navigator.clipboard.writeText(link).then(
      () => {
        alert('Link copiado para a área de transferência!');
      },
      (err) => {
        alert('Falha ao copiar o link: ' + err);
      }
    );
  };

  const leaveRoom = () => {
    sessionStorage.removeItem(`encryptionKey-${roomId}`);
    router.push('/');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="p-4 bg-gray-800 flex justify-between items-center">
        <h2 className="text-xl">{roomName || 'Sala de Chat'}</h2>
        <div className="flex items-center">
          <span className="mr-4">{userName}</span>
          <button
            onClick={leaveRoom}
            className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition"
          >
            Sair
          </button>
        </div>
      </header>
      <div className="p-2 text-center bg-gray-800">
        Código da sala: <span className="font-mono">{roomId}</span>
        <button
          onClick={copyRoomLink}
          className="ml-4 bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700 transition"
        >
          Copiar Link da Sala
        </button>
      </div>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} onSendFile={sendFile} onSendAudio={sendAudio} />
    </div>
  );
};

export default ChatRoom;
