const { Crypto } = require("@peculiar/webcrypto");

const crypto = new Crypto();
const EncryptionHelpers = require('./encoding-helpers');

/**
 * Creates a new Decryption Service.
 * @class
 */
module.exports = class DecryptionService extends EncryptionHelpers {
  /**
   * Decrypt a text.
   * @param {string} text Text to decrypt
   * @return {Promise<string>} The promise of the decrypted text
   */
  decrypt(text) {
    const privateKeyArrayBuffer = this.pemToArrayBuffer(process.env.REQUEST_DECRYPTION_KEY);
    const data = this.base64StringToArrayBuffer(text);

    return this.rsaDecrypt(data, privateKeyArrayBuffer).then((data) => new TextDecoder().decode(data));
  }

  /**
   * Decrypt with RSA.
   * @param {ArrayBufferLike} data
   * @param {ArrayBufferLike} rsaPrivateKeyBuffer Array buffer of the rsa private key
   * @return {Promise<T>} The promise of the RSA decrypted text
   */
  rsaDecrypt(data, rsaPrivateKeyBuffer) {
    return crypto.subtle.importKey('pkcs8', rsaPrivateKeyBuffer, this.rsaAlgorithm, false, ['unwrapKey']).then((rsaKey) => {
      const wrappedAesKeyLength = this.rsaAlgorithm.modulusLength / 8;
      const wrappedAesKey = new Uint8Array(data.slice(0, wrappedAesKeyLength));
      const aesIV = new Uint8Array(data.slice(wrappedAesKeyLength, wrappedAesKeyLength + this.aesIVLength));
      const initializedaesAlgorithm = Object.assign({iv: aesIV}, this.aesAlgorithm);

      return crypto.subtle
          .unwrapKey('raw', wrappedAesKey, rsaKey, this.rsaAlgorithm, initializedaesAlgorithm, false, ['decrypt'])
          .then((aesKey) => {
            const encryptedData = new Uint8Array(data.slice(wrappedAesKeyLength + this.aesIVLength));

            return crypto.subtle.decrypt(initializedaesAlgorithm, aesKey, encryptedData);
          });
    });
  }
};
