import nodemailer from "nodemailer";
import { directory } from "./directory"; // ta classe existante

interface MailOptions {
    to: string;
    subject: string;
    template: string; // chemin relatif au dossier "templates"
    variables?: Record<string, string | number>;
}

class Mailer {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "true", // true pour port 465, false sinon
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    private async renderTemplate(templatePath: string, variables?: Record<string, any>): Promise<string> {
        const fullPath = directory.resolve("templates", templatePath);
        let template = await directory.readFile(fullPath);

        if (variables) {
            template = template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
                const value = variables[key.trim()];
                return value !== undefined ? String(value) : "";
            });
        }

        return template;
    }

    public async send(options: MailOptions): Promise<void> {
        const html = await this.renderTemplate(options.template, options.variables);

        await this.transporter.sendMail({
            from: process.env.SMTP_FROM || '"App" <no-reply@example.com>',
            to: options.to,
            subject: options.subject,
            html,
        });
    }
}

export const mailer = new Mailer();
