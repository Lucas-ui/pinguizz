import dns from "dns/promises";
import os from "os";
import https from "https";

class Network {
    getLocalIP(): string {
        const ifaces = os.networkInterfaces();
        for (const iface of Object.values(ifaces)) {
            if (!iface) continue;
            for (const info of iface) {
                if (info.family === "IPv4" && !info.internal) {
                    return info.address;
                }
            }
        }
        return "127.0.0.1";
    }

    async getPublicIP(): Promise<string> {
        return new Promise((resolve, reject) => {
            https
                .get("https://api.ipify.org", (res) => {
                    let data = "";
                    res.on("data", (chunk) => (data += chunk));
                    res.on("end", () => resolve(data.trim()));
                })
                .on("error", reject);
        });
    }

    isIPv4(ip: string): boolean {
        return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
    }

    isIPv6(ip: string): boolean {
        return /^[0-9a-fA-F:]+$/.test(ip);
    }

    async ping(host: string): Promise<boolean> {
        // Simple DNS resolve as ping substitute (no native ping in Node)
        try {
            const result = await dns.lookup(host);
            return !!result.address;
        } catch {
            return false;
        }
    }

    async resolveDNS(hostname: string): Promise<string[]> {
        try {
            return await dns.resolve(hostname);
        } catch {
            return [];
        }
    }
}

export const network = new Network();
