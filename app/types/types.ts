export interface Message {
  id: string;
  user: string;
  text?: string;
  timestamp: number;
  messageType: 'text' | 'file' | 'audio';
  fileName?: string;
  fileType?: string;
  fileData?: ArrayBuffer;
}

export interface EncryptedMessageData {
  roomId: string;
  id: string;
  user: string;
  encryptedData: ArrayBuffer;
  iv: number[]; 
}
