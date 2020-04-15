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
    const publicKeyArrayBuffer: ArrayBufferLike = this.base64StringToArrayBuffer(environment.requestEncryptionKey);
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
}
