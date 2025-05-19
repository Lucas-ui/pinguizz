import {
    v4 as uuidv4,
    v7 as uuidv7,
    validate as uuidValidate,
    version as uuidVersion,
} from "uuid";
import { randomBytes } from "crypto";
import { customAlphabet, nanoid as defaultNanoid } from "nanoid";

const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

type TokenEncoding = "hex" | "base64";

interface SlugOptions {
    prefix?: string;
    timestamp?: boolean;
}

class Identifier {
    private defaultLength: number;

    constructor(tokenLength: number = 16) {
        this.defaultLength = tokenLength;
    }

    uuidV4(): string {
        return uuidv4();
    }

    uuidV7(): string {
        return uuidv7();
    }

    isValidUUID(uuid: string): boolean {
        return uuidValidate(uuid);
    }

    isUUIDv4(uuid: string): boolean {
        return uuidValidate(uuid) && uuidVersion(uuid) === 4;
    }

    isUUIDv7(uuid: string): boolean {
        return uuidValidate(uuid) && uuidVersion(uuid) === 7;
    }

    generateToken(
        length: number = this.defaultLength,
        encoding: TokenEncoding = "hex"
    ): string {
        return randomBytes(length).toString(encoding);
    }

    generateBase62Token(length: number = this.defaultLength): string {
        const bytes = randomBytes(length);
        let result = "";
        for (let i = 0; i < bytes.length; i++) {
            result += BASE62[bytes[i] % 62];
        }
        return result;
    }

    generateNanoId(length: number = 21): string {
        return defaultNanoid(length);
    }

    generateSlug(options: SlugOptions = {}): string {
        const short = this.generateBase62Token(8);
        const datePart = options.timestamp
            ? new Date().toISOString().slice(0, 10).replace(/-/g, "")
            : null;

        return [options.prefix, datePart, short].filter(Boolean).join("_");
    }

    generateTokenSet() {
        return {
            uuid: this.uuidV7(),
            shortId: this.generateNanoId(12),
            token: this.generateToken(32),
            slug: this.generateSlug({ prefix: "id", timestamp: true }),
        };
    }
}

export default new Identifier();
