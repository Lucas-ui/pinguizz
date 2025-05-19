import fs from "fs/promises";
import mime from "mime-types";

class FileType {
    async detectMimeFromBuffer(buffer: Buffer): Promise<string | null> {
        const { fileTypeFromBuffer } = await import("file-type");
        const result = await fileTypeFromBuffer(buffer);
        return result?.mime || null;
    }

    async detectMimeFromFile(filePath: string): Promise<string | null> {
        try {
            const buffer = await fs.readFile(filePath);
            return this.detectMimeFromBuffer(buffer);
        } catch {
            return null;
        }
    }

    getExtensionFromMime(mimeType: string): string | null {
        return mime.extension(mimeType) || null;
    }

    isImage(mimeType: string): boolean {
        return /^image\//.test(mimeType);
    }

    isPdf(mimeType: string): boolean {
        return mimeType === "application/pdf";
    }
}

export const fileType = new FileType();
