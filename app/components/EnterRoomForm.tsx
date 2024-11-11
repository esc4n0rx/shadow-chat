"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const EnterRoomForm = () => {
  const [roomId, setRoomId] = useState('');
  const router = useRouter();

  const handleEnterRoom = () => {
    if (!roomId.trim()) {
      alert('Por favor, insira o código da sala.');
      return;
    }

    router.push(`/room/${roomId}`);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl text-white mb-4">Entrar em Sala</h2>
      <input
        type="text"
        placeholder="Código da Sala"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
      />
      <button
        onClick={handleEnterRoom}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Entrar na Sala
      </button>
    </div>
  );
};

export default EnterRoomForm;
