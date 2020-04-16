module.exports = class EncryptionHelpers {
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
