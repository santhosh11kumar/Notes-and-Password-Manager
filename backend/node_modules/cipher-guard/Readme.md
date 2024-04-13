# Cipher Guard

Cipher Guard is a lightweight encryption and decryption library providing Caesar and XOR ciphers with Base64 encoding for added security. This package is designed to offer a simple and versatile solution for securing text-based data.

## Installation

Install the package using npm:

```bash
npm install cipher-guard
```

## Usage

```javascript
const { encrypt, decrypt } = require("cipher-guard");

const encryptionKey = 24;
const salt = "abcd";

// Encryption
const encryptedText = encrypt("Hello World!", encryptionKey, salt);
console.log(encryptedText); // IgIEAwt5MQ4MBTx4PT89Ow==

// Decryption
const decryptedText = decrypt(encryptedText, encryptionKey, salt);
console.log(decryptedText); // Hello World!
```

## Functions

### encrypt(text, key, salt)
- text : string
- key  : number (0 - 127)
- salt : string

Returns an encrypted string.

### decrypt(text, key, salt)
- text : string
- key  : number (0 - 127)
- salt : string

Returns a decrypted string.
