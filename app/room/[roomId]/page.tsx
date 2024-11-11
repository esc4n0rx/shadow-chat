"use client";

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import ChatRoom from '../../components/ChatRoom';

const RoomPage: React.FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const roomId = params.roomId as string;
  const roomName = searchParams.get('name') || '';

  if (!roomId) {
    return <div className="text-white">Carregando...</div>;
  }

  return <ChatRoom roomId={roomId} roomName={roomName} />;
};

export default RoomPage;
