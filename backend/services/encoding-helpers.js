const atob = require('atob');
const btoa = require('btoa');


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

  pemToBase64String(value) {
    var lines = value.split(/\n|\\n/);
    var base64String = "";

    for (var i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("-----")) continue;
      base64String += lines[i];
    }

    return base64String;
  }

  base64StringToPem(value, label) {
    var pem = "-----BEGIN {0}-----\n".replace("{0}", label);

    for (var i = 0; i < value.length; i += 64) {
      pem += value.substr(i, 64) + "\n";
    }

    pem += "-----END {0}-----\n".replace("{0}", label);

    return pem;
  }

  pemToArrayBuffer(value) {
    return this.base64StringToArrayBuffer(this.pemToBase64String(value));
  };

  arrayBufferToPem(value, label) {
    return this.base64StringToPem(this.arrayBufferToBase64String(value), label);
  };

};
