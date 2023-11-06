import { hexToBytes } from '@noble/hashes/utils'
import { bech32 } from "bech32"


export function encodeBytes(prefix, hex) {
  let data = hexToBytes(hex)
  return encodeBech32(prefix, data)
}

export function npubEncode(hex) {
          return encodeBytes('npub', hex)
        }

export function encodeBech32(prefix, data){
  let words = bech32.toWords(data)
  return bech32.encode(prefix, words)
}

export const convertToHex = (npub) => {
    try {
      const decoded = bech32.decode(npub);
      return Buffer.from(bech32.fromWords(decoded.words)).toString("hex");
    } catch (error) {
      console.error("Error decoding Bech32:", error);
      return ""; // Provide a default value in case of error
    }
  }

  export const nsecEncode = (hex) => {
    try {
      const bytes = Buffer.from(hex, 'hex');
      const words = bech32.toWords(bytes);
      return bech32.encode('nsec', words); // Replace 'yourPrefix' with the desired Bech32 prefix
      
    } catch (error) {
      console.error("Error encoding Bech32:", error);
      return ""; // Provide a default value in case of error
    }
  };
  