// types/types.ts

export interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: number;
}

export interface EncryptedMessageData {
  roomId: string;
  id: string;
  user: string;
  encryptedData: ArrayBuffer;
  iv: number[]; 
}
