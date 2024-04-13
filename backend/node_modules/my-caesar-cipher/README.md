# Secure-Text-Javascript
The npm package that provides a simple yet effective tool for encrypting and decrypting messages using the classic Caesar Cipher algorithm in JavaScript. This package ensures secure text transmission and cryptography for your applications.

## Installation
- Navigate to the directory where you want to use the package.
- Initialize npm by running ( in your terminal ) :
  ```javascript
  npm init
  ```
- Install the package by running ( in your terminal ) : 
  ```javascript
  npm install my-caesar-cipher
  ```
## Usage 
After installing the package, you can use it in your Node.js projects by requiring it.Write the below code under your index.js( or as your file name ) file.

- Import the package in your JavaScript file:
  ```javascript
  const CaesarCipher = require('my-caesar-cipher');
  ```
- Create an instance of the CaesarCipher class:
   ```javascript
  const cipher = new CaesarCipher();
  ```
- Use the encryption() and decryption() methods to encrypt and decrypt messages:
  ```javascript
  // to encrypt a message
  cipher.encryption();
  // to decrypt a message
  cipher.decryption();
  ```
- Follow the prompts in the terminal to input the message and encryption/decryption key.

## License
This package is licensed under the Apache 2.0 License.
  
