import sharp from "sharp";
import fs from "fs/promises";

class Image {
    async resize(
        inputPath: string,
        outputPath: string,
        width: number,
        height: number
    ): Promise<void> {
        await sharp(inputPath)
            .resize(width, height, { fit: "inside" })
            .toFile(outputPath);
    }

    async convert(
        inputPath: string,
        outputPath: string,
        format: "jpeg" | "png" | "webp" | "avif" = "jpeg"
    ): Promise<void> {
        await sharp(inputPath)[format]().toFile(outputPath);
    }

    async compressJpeg(
        inputPath: string,
        outputPath: string,
        quality = 80
    ): Promise<void> {
        await sharp(inputPath)
            .jpeg({ quality, mozjpeg: true })
            .toFile(outputPath);
    }

    async compressPng(
        inputPath: string,
        outputPath: string,
        quality = 80
    ): Promise<void> {
        await sharp(inputPath)
            .png({ quality, compressionLevel: 9 })
            .toFile(outputPath);
    }

    async getMetadata(inputPath: string): Promise<sharp.Metadata> {
        return await sharp(inputPath).metadata();
    }

    async generateThumbnail(
        inputPath: string,
        outputPath: string,
        size = 150
    ): Promise<void> {
        await sharp(inputPath)
            .resize(size, size, { fit: "cover" })
            .toFile(outputPath);
    }

    async isImage(filePath: string): Promise<boolean> {
        try {
            const buffer = await fs.readFile(filePath);
            const { format } = await sharp(buffer).metadata();
            return ["jpeg", "png", "webp", "avif", "gif", "tiff"].includes(
                format ?? ""
            );
        } catch {
            return false;
        }
    }

    async toBase64(inputPath: string): Promise<string> {
        const buffer = await sharp(inputPath).toBuffer();
        const { format } = await sharp(inputPath).metadata();
        return `data:image/${format};base64,${buffer.toString("base64")}`;
    }
}

export const image = new Image();
