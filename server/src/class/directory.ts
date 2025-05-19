import fs from "fs/promises";
import path from "path";

class Directory {
    basePath: string;

    constructor(basePath: string = process.cwd()) {
        this.basePath = basePath;
    }

    resolve(...segments: string[]): string {
        return path.join(this.basePath, ...segments);
    }

    ensureExtension(filePath: string, ext?: string): string {
        if (ext && !filePath.endsWith(ext)) {
            return `${filePath}${ext.startsWith(".") ? "" : "."}${ext}`;
        }
        return filePath;
    }

    // --- Gestion fichiers ---
    async createFile(
        filePath: string,
        content = "",
        ext?: string
    ): Promise<void> {
        const full = this.resolve(this.ensureExtension(filePath, ext));
        await fs.mkdir(path.dirname(full), { recursive: true });
        await fs.writeFile(full, content, "utf-8");
    }

    async readFile(filePath: string): Promise<string> {
        const full = this.resolve(filePath);
        return await fs.readFile(full, "utf-8");
    }

    async writeFile(filePath: string, content: string): Promise<void> {
        const full = this.resolve(filePath);
        await fs.writeFile(full, content, "utf-8");
    }

    async writeBinaryFile(filePath: string, content: Buffer): Promise<void> {
        const full = this.resolve(filePath);
        await fs.mkdir(path.dirname(full), { recursive: true });
        await fs.writeFile(full, content);
    }

    async appendToFile(filePath: string, content: string): Promise<void> {
        const full = this.resolve(filePath);
        await fs.appendFile(full, content, "utf-8");
    }

    async deleteFile(filePath: string): Promise<void> {
        const full = this.resolve(filePath);
        await fs.unlink(full);
    }

    async renderTemplate(templatePath: string, variables: Record<string, any>): Promise<string> {
        const template = await this.readFile(templatePath);
        return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
            const value = variables[key.trim()];
            return value !== undefined ? String(value) : "";
        });
    }

    // --- JSON helpers ---
    async readJson(filePath: string): Promise<any> {
        const text = await this.readFile(filePath);
        return JSON.parse(text);
    }

    async writeJson(filePath: string, data: any): Promise<void> {
        const text = JSON.stringify(data, null, 2);
        await this.writeFile(filePath, text);
    }

    // --- Dossiers ---
    async createFolder(folderPath: string): Promise<void> {
        const full = this.resolve(folderPath);
        await fs.mkdir(full, { recursive: true });
    }

    async deleteFolder(folderPath: string): Promise<void> {
        const full = this.resolve(folderPath);
        await fs.rm(full, { recursive: true, force: true });
    }

    async listFiles(folderPath: string): Promise<string[]> {
        const full = this.resolve(folderPath);
        return await fs.readdir(full);
    }

    getTemplatePath(templateName: string): string {
        return this.resolve("templates", templateName);
    }

    // --- Fichiers utilitaires ---
    async exists(pathToCheck: string): Promise<boolean> {
        try {
            const full = this.resolve(pathToCheck);
            await fs.access(full);
            return true;
        } catch {
            return false;
        }
    }

    async moveFile(from: string, to: string): Promise<void> {
        await fs.rename(this.resolve(from), this.resolve(to));
    }

    async copyFile(from: string, to: string): Promise<void> {
        await fs.copyFile(this.resolve(from), this.resolve(to));
    }

    // --- Métadonnées ---
    async getMetadata(targetPath: string): Promise<{
        size: number;
        createdAt: Date;
        modifiedAt: Date;
        isFile: boolean;
        isDirectory: boolean;
    }> {
        const full = this.resolve(targetPath);
        const stat = await fs.stat(full);
        return {
            size: stat.size,
            createdAt: stat.birthtime,
            modifiedAt: stat.mtime,
            isFile: stat.isFile(),
            isDirectory: stat.isDirectory(),
        };
    }
}

export const directory = new Directory();
