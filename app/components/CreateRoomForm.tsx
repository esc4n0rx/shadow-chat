
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { generateKey, exportKey } from '../utils/encryption';

const CreateRoomForm: React.FC = () => {
  const [roomName, setRoomName] = useState<string>('');
  const router = useRouter();

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      alert('Por favor, insira um nome para a sala.');
      return;
    }

    const roomId = uuidv4();

    const encryptionKey = await generateKey();
    const exportedKey = await exportKey(encryptionKey);
    const keyString = encodeURIComponent(JSON.stringify(exportedKey));

    sessionStorage.setItem(`encryptionKey-${roomId}`, JSON.stringify(exportedKey));

    const url = `/room/${roomId}?name=${encodeURIComponent(roomName)}#key=${keyString}`;

    router.push(url);
  };

  return (
  <div className="p-6 rounded-lg bg-gray-800 bg-opacity-50">
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl text-white mb-4">Criar Sala Privada</h2>
      <input
        type="text"
        placeholder="Nome da Sala"
        value={roomName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
      />
      <button
        onClick={handleCreateRoom}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Criar Sala
      </button>
    </div>
  </div>
  );
};

export default CreateRoomForm;
