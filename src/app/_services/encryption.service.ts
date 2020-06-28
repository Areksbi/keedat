import { Injectable } from '@angular/core';
import { from, Observable, ObservedValueOf } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private aesIVLength = 12;
  private rsaAlgorithm = {
    name: 'RSA-OAEP',
    modulusLength: 2048,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: { name: 'SHA-256' },
  };
  private aesAlgorithm = {
    name: 'AES-GCM',
    length: 256,
  };

  encrypt(text: string): Observable<ObservedValueOf<Promise<string>>> {
    const publicKeyArrayBuffer: ArrayBufferLike = this.pemToArrayBuffer(environment.requestEncryptionKey);
    const encodedText: Uint8Array = new TextEncoder().encode(text);

    return from(
      this.rsaEncrypt(encodedText, publicKeyArrayBuffer).then((data: Promise<ArrayBufferLike>): string =>
        this.arrayBufferToBase64String(data)
      )
    );
  }

  private rsaEncrypt(data, rsaPublicKeyBuffer): Promise<Promise<ArrayBufferLike>> {
    const importRsaPublicKey: PromiseLike<CryptoKey> = crypto.subtle.importKey('spki', rsaPublicKeyBuffer, this.rsaAlgorithm, false, [
      'wrapKey',
    ]);
    const generateAesKey: PromiseLike<CryptoKey> = crypto.subtle.generateKey(this.aesAlgorithm, true, ['encrypt']);

    const aesIVLength: number = this.aesIVLength;
    const aesAlgorithm = this.aesAlgorithm;
    const rsaAlgorithm = this.rsaAlgorithm;

    return Promise.all([importRsaPublicKey, generateAesKey]).then(
      (keys: CryptoKey[]): Promise<any> => {
        const rsaPublicKey: CryptoKey = keys[0];
        const aesKey: CryptoKey = keys[1];
        const aesIV: Uint8Array = crypto.getRandomValues(new Uint8Array(aesIVLength));
        const initializedAesAlgorithm = { iv: aesIV, ...aesAlgorithm };

        const wrapAesKey: PromiseLike<ArrayBuffer> = crypto.subtle.wrapKey('raw', aesKey, rsaPublicKey, rsaAlgorithm);
        const encryptData: PromiseLike<ArrayBuffer> = crypto.subtle.encrypt(initializedAesAlgorithm, aesKey, data);

        return Promise.all([wrapAesKey, encryptData]).then(
          (buffers: ArrayBuffer[]): ArrayBufferLike => {
            const wrappedAesKey: Uint8Array = new Uint8Array(buffers[0]);
            const encryptedData: Uint8Array = new Uint8Array(buffers[1]);
            const encryptionState: Uint8Array = new Uint8Array(wrappedAesKey.length + aesIV.length + encryptedData.length);
            encryptionState.set(wrappedAesKey, 0);
            encryptionState.set(aesIV, wrappedAesKey.length);
            encryptionState.set(encryptedData, wrappedAesKey.length + aesIV.length);
            return encryptionState.buffer;
          }
        );
      }
    );
  }

  decrypt(text): Observable<ObservedValueOf<PromiseLike<string>>> {
    const privateKeyArrayBuffer = this.pemToArrayBuffer(environment.responseDecryptionKey);
    const data = this.base64StringToArrayBuffer(text);
    return from(this.rsaDecrypt(data, privateKeyArrayBuffer)
      .then((data: ArrayBuffer) => new TextDecoder().decode(data)))
  }

  public rsaDecrypt(data, rsaPrivateKeyBuffer): PromiseLike<ArrayBuffer> {
    const aesIVLength: number = this.aesIVLength;
    const aesAlgorithm = this.aesAlgorithm;
    const rsaAlgorithm = this.rsaAlgorithm;

    return crypto.subtle.importKey("pkcs8", rsaPrivateKeyBuffer, rsaAlgorithm, false, ["unwrapKey"])
      .then(function (rsaKey: CryptoKey) {
        const wrappedAesKeyLength = rsaAlgorithm.modulusLength / 8;
        const wrappedAesKey = new Uint8Array(data.slice(0, wrappedAesKeyLength));
        const aesIV = new Uint8Array(data.slice(wrappedAesKeyLength, wrappedAesKeyLength + aesIVLength));
        const initializedaesAlgorithm = Object.assign({ iv: aesIV }, aesAlgorithm);

        return crypto.subtle.unwrapKey("raw", wrappedAesKey, rsaKey, rsaAlgorithm, initializedaesAlgorithm, false, ["decrypt"])
          .then ((aesKey: CryptoKey) => {
            const encryptedData = new Uint8Array(data.slice(wrappedAesKeyLength + aesIVLength));
            return crypto.subtle.decrypt(initializedaesAlgorithm, aesKey, encryptedData)
          });
      });
  };

  private base64StringToArrayBuffer(value): ArrayBufferLike {
    const byteString: string = atob(value);
    const byteArray: Uint8Array = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    return byteArray.buffer;
  }

  private arrayBufferToBase64String(value): string {
    const byteArray: Uint8Array = new Uint8Array(value);
    let byteString = '';

    for (let i = 0; i < byteArray.byteLength; i++) {
      byteString += String.fromCharCode(byteArray[i]);
    }

    return btoa(byteString);
  }


  pemToBase64String(value) {
    var lines = value.split("\n");
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
}
