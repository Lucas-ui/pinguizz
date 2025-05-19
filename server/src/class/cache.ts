type CacheEntry = {
    value: any;
    expiresAt?: number;
};

class Cache {
    private store = new Map<string, CacheEntry>();

    set(key: string, value: any, ttlMs?: number): void {
        const entry: CacheEntry = { value };
        if (ttlMs) {
            entry.expiresAt = Date.now() + ttlMs;
            setTimeout(() => this.store.delete(key), ttlMs);
        }
        this.store.set(key, entry);
    }

    get<T>(key: string): T | undefined {
        const entry = this.store.get(key);
        if (!entry) return undefined;
        if (entry.expiresAt && entry.expiresAt < Date.now()) {
            this.store.delete(key);
            return undefined;
        }
        return entry.value;
    }

    has(key: string): boolean {
        return this.get(key) !== undefined;
    }

    delete(key: string): void {
        this.store.delete(key);
    }

    clear(): void {
        this.store.clear();
    }
}

export const cache = new Cache();
