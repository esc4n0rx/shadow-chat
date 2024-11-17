"use client";

import React, { useState, useRef } from 'react';
import { FaSmile, FaMicrophone, FaStop } from 'react-icons/fa';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import FileUpload from './FileUpload';

interface MessageInputProps {
  onSendMessage: (messageText: string) => void;
  onSendFile: (file: File) => void;
  onSendAudio: (audioBlob: Blob) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onSendFile, onSendAudio }) => {
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addEmoji = (emoji: any) => {
    setMessageText((prev) => prev + emoji.native);
  };

  const handleFileSelected = (file: File) => {
    onSendFile(file);
  };

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          onSendAudio(audioBlob);
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Erro ao iniciar a gravação:', err);
        alert('Não foi possível acessar o microfone.');
      }
    } else {
      alert('Seu navegador não suporta gravação de áudio.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 flex relative items-center">
      <button
        onClick={() => setShowEmojiPicker((val) => !val)}
        className="text-white mr-2"
      >
        <FaSmile size={24} />
      </button>
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-0 z-10">
          <Picker data={data} onEmojiSelect={addEmoji} theme="dark" />
        </div>
      )}
      <FileUpload onFileSelected={handleFileSelected} />
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite sua mensagem"
        className="flex-grow p-2 bg-gray-700 text-white rounded-l"
      />
      {isRecording ? (
        <button
          onClick={stopRecording}
          className="text-red-500 ml-2 mr-2"
          title="Parar Gravação"
        >
          <FaStop size={24} />
        </button>
      ) : (
        <button
          onClick={startRecording}
          className="text-green-500 ml-2 mr-2"
          title="Gravar Áudio"
        >
          <FaMicrophone size={24} />
        </button>
      )}
      <button
        onClick={handleSendMessage}
        className="bg-blue-600 text-white py-2 px-4 rounded-r hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </div>
  );
};

export default MessageInput;
