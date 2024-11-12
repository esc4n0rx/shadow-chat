// app/page.tsx

"use client";

import React, { useState } from 'react';
import CreateRoomForm from './components/CreateRoomForm';
import EnterRoomForm from './components/EnterRoomForm';

const HomePage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleIniciar = () => {
    setShowOptions(true);
  };

  const handleGithub = () => {
    window.open('https://github.com/esc4n0rx/shadow-chat', '_blank');
  };

  const handleContato = () => {
    setShowContactForm(true);
  };

  const handleContactFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Formulário enviado com sucesso!');
    setShowContactForm(false);
  };

  const handleContactFormClose = () => {
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      {!showOptions && !showContactForm && (
        <div className="text-center">
          <h1 className="text-5xl text-white mb-4">ShadowChat</h1>
          <p className="text-gray-300 mb-8">
            Um chat privado e seguro para conversas criptografadas
            Nada do que estiver aqui pode ser visto.
          </p>
          <div className="space-x-4">
            <button
              onClick={handleIniciar}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Iniciar
            </button>
            <button
              onClick={handleGithub}
              className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              Github
            </button>
            <button
              onClick={handleContato}
              className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              Contato
            </button>
          </div>
        </div>
      )}

      {showOptions && (
        <div>
          <h1 className="text-4xl text-white mb-8">ShadowChat</h1>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
            <CreateRoomForm />
            <EnterRoomForm />
          </div>
        </div>
      )}

      {showContactForm && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl text-white mb-4">Contato</h2>
          <form onSubmit={handleContactFormSubmit}>
            <input
              type="text"
              placeholder="Seu Nome"
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              required
            />
            <input
              type="email"
              placeholder="Seu Email"
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              required
            />
            <textarea
              placeholder="Sua Mensagem"
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              required
            ></textarea>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Enviar
              </button>
              <button
                type="button"
                onClick={handleContactFormClose}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
