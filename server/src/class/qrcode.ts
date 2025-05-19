import QR from "qrcode";

class QRCode {
    // HTML
    async toDataURL(data: string): Promise<string> {
        return await QR.toDataURL(data);
    }

    // raw
    async toBuffer(data: string): Promise<Buffer> {
        return await QR.toBuffer(data);
    }

    async toSVG(data: string): Promise<string> {
        return await QR.toString(data, { type: "svg" });
    }

    async toTerminal(data: string): Promise<string> {
        return await QR.toString(data, { type: "terminal" });
    }
    createLink(url: string): string {
        return url;
    }

    createEmail(to: string, subject = "", body = ""): string {
        return `mailto:${to}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
    }

    createSMS(number: string, message = ""): string {
        return `sms:${number}?body=${encodeURIComponent(message)}`;
    }

    createPhoneCall(number: string): string {
        return `tel:${number}`;
    }

    createWifi(
        ssid: string,
        password: string,
        type: "WPA" | "WEP" = "WPA"
    ): string {
        return `WIFI:T:${type};S:${ssid};P:${password};;`;
    }
}

export const qrCode = new QRCode();
