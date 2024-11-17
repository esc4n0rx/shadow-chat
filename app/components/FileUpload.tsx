"use client";

import React, { useRef } from 'react';
import { FaPaperclip } from 'react-icons/fa';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelected(event.target.files[0]);
      event.target.value = ''; // Reset the input
    }
  };

  return (
    <div>
      <button onClick={handleFileClick} className="text-white mr-2">
        <FaPaperclip size={24} />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileUpload;
