import { PDFDocument } from "pdf-lib";
import puppeteer from "puppeteer";
import { directory } from "../class/directory";

class Pdf {
  async generateFromText(text: string): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(text || "Document vide");

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  async generateFromHtml(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });
    const buffer = await page.pdf({ format: "A4" });

    await browser.close();
    return buffer;
  }

  async saveToFile(content: string, filePath: string): Promise<void> {
    const buffer = await this.generateFromText(content);
    await directory.writeBinaryFile(filePath, buffer);
  }

  async generate(content: string): Promise<Buffer> {
    return this.generateFromText(content);
  }
}

export const pdf = new Pdf();
