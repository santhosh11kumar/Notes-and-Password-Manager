const readline = require('readline');

class CaesarCipher {
    constructor() {
        this.emap = new Map();
        this.dmap = new Map();
        this.initializeMaps();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    initializeMaps() {
        let ch = 'A';
        for (let i = 0; i < 26; i++) {
            this.emap.set(ch, i);
            this.dmap.set(i, ch);
            ch = String.fromCharCode(ch.charCodeAt(0) + 1);
        }
    }

    async getInput(message) {
        return new Promise((resolve) => {
            this.rl.question(message, (input) => {
                resolve(input);
            });
        });
    }

    async encryption() {
        const str = await this.getInput("Enter the Plain text: ");
        const key = parseInt(await this.getInput("Enter the key: "));
        let emessage = "";
        for (const ch of str.toUpperCase()) {
            let index = this.emap.get(ch);
            if (index !== undefined) {
                let location = (index + key) % 26;
                emessage += this.dmap.get(location);
            } else {
                emessage += ch;
            }
        }
        console.log("The Cipher Text after Encryption is: " + emessage);
        this.rl.close();
    }

    async decryption() {
        const str = await this.getInput("Enter the Cipher text: ");
        const key = parseInt(await this.getInput("Enter the key: "));
        let dmessage = "";
        for (const ch of str.toUpperCase()) {
            let index = this.emap.get(ch);
            if (index !== undefined) {
                let location = (index - key + 26) % 26;
                dmessage += this.dmap.get(location);
            } else {
                dmessage += ch;
            }
        }
        console.log("The Plain text after Decryption is: " + dmessage);
        this.rl.close();
    }
}

module.exports = CaesarCipher;

// Usage Example :
// const cipher = new CaesarCipher();
// cipher.encryption();
// or
// cipher.decryption();
