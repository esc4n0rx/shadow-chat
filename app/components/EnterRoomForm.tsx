"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const EnterRoomForm: React.FC = () => {
  const [roomId, setRoomId] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const [keyString, setKeyString] = useState<string>('');
  const router = useRouter();

  const handleEnterRoom = () => {
    if (!roomId.trim() || !keyString.trim()) {
      alert('Por favor, insira o código da sala e a chave de criptografia.');
      return;
    }

    const url = `/room/${roomId}?name=${encodeURIComponent(roomName)}#key=${encodeURIComponent(keyString)}`;

    router.push(url);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl text-white mb-4">Entrar em Sala Privada</h2>
      <input
        type="text"
        placeholder="Código da Sala"
        value={roomId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomId(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
      />
      <input
        type="text"
        placeholder="Nome da Sala (opcional)"
        value={roomName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
      />
      <textarea
        placeholder="Chave de Criptografia"
        value={keyString}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setKeyString(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        rows={4}
      ></textarea>
      <button
        onClick={handleEnterRoom}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Entrar na Sala
      </button>
    </div>
  );
};

export default EnterRoomForm;
