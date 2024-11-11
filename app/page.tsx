"use client";

import React from 'react';
import CreateRoomForm from './components/CreateRoomForm';
import EnterRoomForm from './components/EnterRoomForm';


const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl text-white mb-8">ShadowChat</h1>
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
        <CreateRoomForm />
        <EnterRoomForm />
      </div>
    </div>
  );
};

export default HomePage;
