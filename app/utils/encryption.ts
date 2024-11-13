// utils/encryption.ts

export async function generateKey(): Promise<CryptoKey> {
    return await window.crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }
  
  export async function exportKey(key: CryptoKey): Promise<JsonWebKey> {
    return await window.crypto.subtle.exportKey('jwk', key);
  }
  
  export async function importKey(jwk: JsonWebKey): Promise<CryptoKey> {
    return await window.crypto.subtle.importKey('jwk', jwk, { name: 'AES-GCM' }, true, ['encrypt', 'decrypt']);
  }
  
  export async function encryptMessage(
    message: string | ArrayBuffer,
    key: CryptoKey
  ): Promise<{ encryptedData: ArrayBuffer; iv: Uint8Array }> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
  
    let encodedMessage: ArrayBuffer;
  
    if (typeof message === 'string') {
      encodedMessage = new TextEncoder().encode(message);
    } else {
      encodedMessage = message;
    }
  
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      encodedMessage
    );
  
    return { encryptedData, iv };
  }
  
  export async function decryptMessage(
    encryptedData: ArrayBuffer,
    key: CryptoKey,
    iv: Uint8Array,
    returnType: 'string' | 'ArrayBuffer' = 'string'
  ): Promise<string | ArrayBuffer> {
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      encryptedData
    );
  
    if (returnType === 'string') {
      const decodedMessage = new TextDecoder().decode(decryptedData);
      return decodedMessage;
    } else {
      return decryptedData;
    }
  }
  
  