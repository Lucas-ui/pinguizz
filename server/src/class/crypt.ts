import {
    createCipheriv,
    createDecipheriv,
    randomBytes,
    scryptSync,
    timingSafeEqual,
} from "crypto";

class Crypt {
    private keyLength = 32; // AES-256 => 32 bytes
    private ivLength = 16; // Standard pour AES

    generateKey(seed: string): Buffer {
        return scryptSync(seed, "cipher_salt", this.keyLength);
    }

    generateRandomKey(): Buffer {
        return randomBytes(this.keyLength);
    }

    generateIV(): Buffer {
        return randomBytes(this.ivLength);
    }

    encrypt(plaintext: string, key: Buffer): string {
        const iv = this.generateIV();
        const cipher = createCipheriv("aes-256-cbc", key, iv);
        const encrypted = Buffer.concat([
            cipher.update(plaintext, "utf8"),
            cipher.final(),
        ]);
        return iv.toString("hex") + ":" + encrypted.toString("hex");
    }

    decrypt(cipherText: string, key: Buffer): string {
        const [ivHex, dataHex] = cipherText.split(":");
        if (!ivHex || !dataHex)
            throw new Error("Format invalide pour le texte chiffré.");

        const iv = Buffer.from(ivHex, "hex");
        const encrypted = Buffer.from(dataHex, "hex");

        const decipher = createDecipheriv("aes-256-cbc", key, iv);
        const decrypted = Buffer.concat([
            decipher.update(encrypted),
            decipher.final(),
        ]);
        return decrypted.toString("utf8");
    }

    encryptWithIV(plaintext: string, key: Buffer, iv: Buffer): string {
        const cipher = createCipheriv("aes-256-cbc", key, iv);
        const encrypted = Buffer.concat([
            cipher.update(plaintext, "utf8"),
            cipher.final(),
        ]);
        return encrypted.toString("hex");
    }

    decryptWithIV(encryptedHex: string, key: Buffer, iv: Buffer): string {
        const encrypted = Buffer.from(encryptedHex, "hex");
        const decipher = createDecipheriv("aes-256-cbc", key, iv);
        const decrypted = Buffer.concat([
            decipher.update(encrypted),
            decipher.final(),
        ]);
        return decrypted.toString("utf8");
    }

    isValidEncryptedString(input: string): boolean {
        return /^[a-f0-9]{32}:[a-f0-9]+$/i.test(input);
    }

    safeCompare(a: string, b: string): boolean {
        const buffA = Buffer.from(a);
        const buffB = Buffer.from(b);
        if (buffA.length !== buffB.length) return false;
        return timingSafeEqual(buffA, buffB);
    }
}

export const crypt = new Crypt();
