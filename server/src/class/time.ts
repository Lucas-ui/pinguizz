class Time {
    now(): Date {
        return new Date();
    }

    timestamp(): number {
        return Date.now();
    }

    sleep(ms: number): Promise<void> {
        return new Promise((r) => setTimeout(r, ms));
    }

    addDays(date: Date, days: number): Date {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    }

    subMinutes(date: Date, minutes: number): Date {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - minutes);
        return d;
    }

    format(date: Date, fmt = "iso"): string {
        const pad = (n: number) => n.toString().padStart(2, "0");

        switch (fmt) {
            case "iso":
                return date.toISOString();

            case "YYYY-MM-DD HH:mm:ss":
                return (
                    date.getFullYear() +
                    "-" +
                    pad(date.getMonth() + 1) +
                    "-" +
                    pad(date.getDate()) +
                    " " +
                    pad(date.getHours()) +
                    ":" +
                    pad(date.getMinutes()) +
                    ":" +
                    pad(date.getSeconds())
                );

            case "DD/MM/YYYY":
                return (
                    pad(date.getDate()) +
                    "/" +
                    pad(date.getMonth() + 1) +
                    "/" +
                    date.getFullYear()
                );
            case "YYYY-MM-DD":
                return (
                    pad(date.getDate()) +
                    "-" +
                    pad(date.getMonth() + 1) +
                    "-" +
                    date.getFullYear()
                );
            case "HH:mm:ss":
                return (
                    pad(date.getHours()) +
                    ":" +
                    pad(date.getMinutes()) +
                    ":" +
                    pad(date.getSeconds())
                );

            case "HH:mm":
                return pad(date.getHours()) + ":" + pad(date.getMinutes());

            default:
                return date.toString();
        }
    }

    diffInMinutes(a: Date, b: Date): number {
        return Math.abs(a.getTime() - b.getTime()) / 60000;
    }

    isPast(date: Date): boolean {
        return date.getTime() < Date.now();
    }
}

export const time = new Time();
