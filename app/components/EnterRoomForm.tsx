
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const EnterRoomForm: React.FC = () => {
  const [roomLink, setRoomLink] = useState<string>('');
  const router = useRouter();

  const handleEnterRoom = () => {
    if (!roomLink.trim()) {
      alert('Por favor, insira o link da sala.');
      return;
    }

    try {
      const url = new URL(roomLink);
      const path = url.pathname + url.search + url.hash;
      router.push(path);
    } catch (error) {
      alert('Link inválido. Por favor, insira um link válido da sala.');
    }
  };

  return (
  <div className="p-6 rounded-lg bg-gray-800 bg-opacity-50">
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl text-white mb-4">Entrar em Sala Privada</h2>
      <input
        type="text"
        placeholder="Link da Sala"
        value={roomLink}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomLink(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
      />
      <button
        onClick={handleEnterRoom}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Entrar na Sala
      </button>
    </div>
  </div>
  );
};

export default EnterRoomForm;
