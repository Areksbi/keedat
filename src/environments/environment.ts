// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  api: 'http://localhost:3000/api',
  production: false,
  recaptcha: '6LcW0ssUAAAAAE9glDkg8l2MLhQgReaOwmA9G6vr',
  requestEncryptionKey: `-----BEGIN RSA PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0tjAJ5uHDF9ivNRhaVSY
Jy8ciz9pMDxjwjHTL7W+P3y1tAcAqAm1wesdB5lzSQwyoYzvi0jY+YD9biX0nknZ
RqiSt7HAMKvWqcGzAjupF2mywglAHS3YFHW2P81GToDMyhT6SVDog/VoCOTiohy2
GnKHGePJoVQv4439pzszYMCH7hU/dV9Z/6qayI6/TD7dHTIBwItU+mEn7qAwGnuf
mD0G7yfgzP4b6p1Ct9FrQcn+WHFCjQL/C/Eo2Mbu518swt70NKr33tBhpUo4NPaH
PI4XVfG9sW0ULtJt5DF+nTRouSmcMisMpd2qYrCxx7SGW1anoTu+EvMoXdWbHPVE
OwIDAQAB
-----END RSA PUBLIC KEY-----`,
  responseDecryptionKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDV9bQNPKNUXb6N
rHaLg41PYfBz4MXuEfjhShOLb425g9P9L032KdbswMkdnUSjrGdn6DoYnl5cRS0x
oflpV1oteWpJax2Ti7nd3UET/mF8MPeTlHUjNtaZvMH2m+wACGSU6D2Q5iCS0cOq
Qvkwa7rqN/vNwwVhtxMCxolNED5Tm36qvXX8w2q3ADN/WQlAzmzHOJFDxNvgkkXl
IZ0QP83NSsfvyzSO1RuCkApnUjZvpB9FaEW0hfjNGVbz1Sl3QBf9KnO00Hq7320W
GvMv1rHCADegURArmbAL1nnEyzr6cW0vdQyjnG4xwB0JfJM9yrYaEqN0vxd2Fo0E
CrKEc5/JAgMBAAECggEABQKf7hTBbl7+RgBdNknPq/rgepYvjFz3YFnaY1Aqwsay
LCJIx77rEtg2MsSqsCUqtrrawWt+oi0shcED6ieVgQMa2LqdaAXERcxskwnzQR6U
bZbzDJliz8QlIUqSwt1vct04CTCaYABxfdyGS/qkgd+VvJfDLyqY/gj60Mcp7niR
Y9AsDxdrALq975MJ94x/MS2KKfCljAetXroW6eBhxYUUzGuikvy8c5Wn9TrmBwFG
5BOG/sZboFVHfia8MAJGnv/FFWZZ4vDrE4fJmpkAywBYBAekVi7UEiNY298kWvou
FaRSAZlDN5HdkOB0NwP6Z9xjso9+VMUX+inDWzjqAQKBgQDwMNYNAg52hQF9wJG4
ODYQaD/2ZzeQZV1Nh19hhTwZ6GuvisMQGbXzv20R+FgU4poynFfCAbtnTazcwZlg
HEgOTDffNQAY+V1z/Znnu9GHHhput9XcxMTdTVPtr4iDvm9xk1tlF0LOcP0OIIdi
j2E2LHuujC9kLbZGeJbGxmktsQKBgQDkCuFtGwtYs9Edcv6pylpLaRSEQw+3PWTH
QZolh5LGQnotRgszltJLEqHSzwdgnyujQpKPUyY/bCUcbpTOri+l1iMNhT8KlHHY
U2lHjWKuwREY6lFTWPVdXr79M0lZsFpTt0dO7ePUjIlDYyvx04X0RzOcVwOnAYWE
Rxp6l0uhmQKBgQDOracykEdzsqWC2NZLB4t1+M65Lz3/sUlk8gyf9K6vuHAZIDUT
QJxxvpGS+fiJGCgJTsCw/x6MGKmbV7ernQpfyzP0jD2mP8UrjtgFMHduZffmt6d+
DY88wlJq3zV/77kjqOHnDen9i/okUtdMdwX2QLa4joYlFLSY1SEgsBBHMQKBgGzm
qUqSTLPag3Wd0fHBmadDkjGrWNj376WcNYHQoY4edvwh4/2J+/kv96mVhn9k49D+
XMEnQy+sdHiEcnnVAxoeDfVJ+ZYS198nzjIGWeb8ei68z4OPCvXA5lJCaLf1GN27
u8j8n/2D85UDyhudGO5UBliV0T+y4VEPJ5z9nXeZAoGBAMpGC/gU0kk7ilmz28WA
ShL+XjWYb3j/T+RBrew/TlzdtzXst2tGFr6jA6D9kgqiBJIXp51J6CC4y2Vfc82g
gEcW8dQY7Q3/UQgU6949SXXuaY21vBnVVEFpjpNUr9wSFz4MnGvuyh5rXPkNEZAf
yFnWYWO2h5qiBvzVvRJZaydw
-----END RSA PRIVATE KEY-----`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
