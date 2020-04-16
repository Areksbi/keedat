/**
 * Creates a new Encryption Service.
 * @class
 */

module.exports = class EncryptionService {
  /**
   * @constructs
   */
  constructor() {
    this.aesIVLength = 12;
    this.rsaAlgorithm = {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: {name: 'SHA-256'},
    };
    this.aesAlgorithm = {
      name: 'AES-GCM',
      length: 256,
    };
  }

  /**
   * Encrypt a text.
   * @param {string} text Text to encrypt
   * @return {Promise<string>} The promise of the encrypted text
   */
  encrypt(text) {
    const publicKeyArrayBuffer = this.base64StringToArrayBuffer(process.env.RESPONSE_ENCRYPTION_KEY);
    const encodedText = new TextEncoder().encode(text);
    return this.rsaEncrypt(encodedText, publicKeyArrayBuffer).then((data) => this.arrayBufferToBase64String(data));
  }

  /**
   * Encrypt with RSA.
   * @param {Uint8Array} data Encoded text to encrypt
   * @param {ArrayBufferLike} rsaPublicKeyBuffer Array buffer of the rsa public key
   * @return {Promise<SharedArrayBuffer | ArrayBuffer>} The promise of the RSA encrypted text
   */
  rsaEncrypt(data, rsaPublicKeyBuffer) {
    const importRsaPublicKey = crypto.subtle.importKey('spki', rsaPublicKeyBuffer, this.rsaAlgorithm, false, ['wrapKey']);
    const generateAesKey = crypto.subtle.generateKey(this.aesAlgorithm, true, ['encrypt']);
    const aesIVLength = this.aesIVLength;
    const aesAlgorithm = this.aesAlgorithm;
    const rsaAlgorithm = this.rsaAlgorithm;

    return Promise.all([importRsaPublicKey, generateAesKey]).then((keys) => {
      const rsaPublicKey = keys[0];
      const aesKey = keys[1];
      const aesIV = crypto.getRandomValues(new Uint8Array(aesIVLength));
      const initializedAesAlgorithm = Object.assign({iv: aesIV}, aesAlgorithm);
      const wrapAesKey = crypto.subtle.wrapKey('raw', aesKey, rsaPublicKey, rsaAlgorithm);
      const encryptData = crypto.subtle.encrypt(initializedAesAlgorithm, aesKey, data);

      return Promise.all([wrapAesKey, encryptData]).then((buffers) => {
        const wrappedAesKey = new Uint8Array(buffers[0]);
        const encryptedData = new Uint8Array(buffers[1]);
        const encryptionState = new Uint8Array(wrappedAesKey.length + aesIV.length + encryptedData.length);
        encryptionState.set(wrappedAesKey, 0);
        encryptionState.set(aesIV, wrappedAesKey.length);
        encryptionState.set(encryptedData, wrappedAesKey.length + aesIV.length);
        return encryptionState.buffer;
      });
    });
  }

  /**
   * Convert a base64 string to array buffer.
   * @param {string} value Text to convert
   * @return {ArrayBufferLike} The string converted to array buffer
   */
  base64StringToArrayBuffer(value) {
    const byteString = atob(value);
    const byteArray = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    return byteArray.buffer;
  }

  /**
   * Convert an array buffer to base64 string.
   * @param {ArrayBufferLike} value Array buffer to convert
   * @return {string} The array buffer converted to string
   */
  arrayBufferToBase64String(value) {
    const byteArray = new Uint8Array(value);
    let byteString = '';

    for (let i = 0; i < byteArray.byteLength; i++) {
      byteString += String.fromCharCode(byteArray[i]);
    }

    return btoa(byteString);
  }
};
