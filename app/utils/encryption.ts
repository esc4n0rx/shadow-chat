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
    message: string,
    key: CryptoKey
  ): Promise<{ encryptedData: ArrayBuffer; iv: Uint8Array }> {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
    return { encryptedData, iv };
  }
  
  export async function decryptMessage(
    encryptedData: ArrayBuffer,
    key: CryptoKey,
    iv: Uint8Array
  ): Promise<string> {
    const decryptedData = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encryptedData);
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  }
  