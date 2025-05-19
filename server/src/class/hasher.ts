import bcrypt from "bcrypt";
import argon2 from "argon2";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

class Hasher {
    bcryptRounds: number;
    argon2Options: argon2.Options;
    scryptOptions: {
        keylen: number;
        cost: number;
        blockSize: number;
        parallelization: number;
    };

    constructor() {
        // Nombre de rounds pour bcrypt
        this.bcryptRounds = Number(process.env.BCRYPT_ROUNDS) || 10;

        // Options pour argon2
        this.argon2Options = {
            type: argon2.argon2id,
            memoryCost: Number(process.env.ARGON2_MEMORY) || 2 ** 16,
            timeCost: Number(process.env.ARGON2_TIME) || 3,
            parallelism: Number(process.env.ARGON2_PARALLELISM) || 1,
        };

        // Options pour scrypt
        this.scryptOptions = {
            keylen: Number(process.env.SCRYPT_KEYLEN) || 64,
            cost: Number(process.env.SCRYPT_COST) || 16384,
            blockSize: Number(process.env.SCRYPT_BLOCKSIZE) || 8,
            parallelization: Number(process.env.SCRYPT_PARALLELIZATION) || 1,
        };
    }

    // --- Bcrypt ---
    async bcryptHash(value: string): Promise<string> {
        return bcrypt.hash(value, this.bcryptRounds);
    }

    async bcryptCompare(value: string, hash: string): Promise<boolean> {
        return bcrypt.compare(value, hash);
    }

    isBcryptHash(value: string): boolean {
        return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(value);
    }

    // --- Argon2 ---
    async argon2Hash(value: string): Promise<string> {
        return argon2.hash(value, this.argon2Options);
    }

    async argon2Verify(value: string, hash: string): Promise<boolean> {
        try {
            return await argon2.verify(hash, value);
        } catch {
            return false;
        }
    }

    isArgon2Hash(value: string): boolean {
        return value.startsWith("$argon2");
    }

    // --- Scrypt ---
    scryptHash(value: string, salt: Buffer = randomBytes(16)): string {
        const key = scryptSync(value, salt, this.scryptOptions.keylen);
        return salt.toString("hex") + ":" + key.toString("hex");
    }

    scryptVerify(value: string, stored: string): boolean {
        const [saltHex, keyHex] = stored.split(":");
        if (!saltHex || !keyHex) return false;
        const salt = Buffer.from(saltHex, "hex");
        const key = Buffer.from(keyHex, "hex");
        const derivedKey = scryptSync(value, salt, key.length);
        return timingSafeEqual(key, derivedKey);
    }

    isScryptHash(value: string): boolean {
        return /^[a-f0-9]{32}:[a-f0-9]{128}$/.test(value);
    }

    // --- Interface simple ---
    async hash(
        value: string,
        algo: "bcrypt" | "argon2" | "scrypt" = "bcrypt"
    ): Promise<string> {
        switch (algo) {
            case "argon2":
                return this.argon2Hash(value);
            case "scrypt":
                return this.scryptHash(value);
            default:
                return this.bcryptHash(value);
        }
    }

    async compare(value: string, hash: string): Promise<boolean> {
        if (this.isBcryptHash(hash)) {
            return this.bcryptCompare(value, hash);
        }
        if (this.isArgon2Hash(hash)) {
            return this.argon2Verify(value, hash);
        }
        if (this.isScryptHash(hash)) {
            return this.scryptVerify(value, hash);
        }
        return false;
    }
}

export const hasher = new Hasher();
