# 🌐 Network – Gestion et utilitaires réseau

Classe utilitaire pour récupérer des adresses IP, valider des formats IP, effectuer des résolutions DNS, et tester la connectivité basique.

# 🔧 Méthodes disponibles

```ts
getLocalIP(): string
```

Récupère l’adresse IPv4 locale de la machine (non interne).  
Retourne `"127.0.0.1"` si aucune IP locale n’est trouvée.

---

```ts
getPublicIP(): Promise<string>
```

Récupère l’adresse IP publique via une requête HTTPS vers un service externe (api.ipify.org).

---

```ts
isIPv4(ip: string): boolean
```

Vérifie si une chaîne est une adresse IPv4 valide (format simple, sans validation de valeur des octets).

---

```ts
isIPv6(ip: string): boolean
```

Vérifie si une chaîne est une adresse IPv6 (validation basique du format hexadécimal et des `:`).

---

```ts
ping(host: string): Promise<boolean>
```

Simule un ping en effectuant une résolution DNS du nom d’hôte.
Retourne `true` si l’hôte répond (résolution réussie), `false` sinon.

---

```ts
resolveDNS(hostname: string): Promise<string[]>
```

Résout un nom de domaine en liste d’adresses IP.
Retourne un tableau d’adresses IP ou un tableau vide si échec.

---

## 💡 Exemples d’utilisation

```ts
const localIP = network.getLocalIP();
console.log("Local IP:", localIP);

const publicIP = await network.getPublicIP();
console.log("Public IP:", publicIP);

console.log(network.isIPv4("192.168.0.1")); // true
console.log(network.isIPv6("::1")); // true

const canPing = await network.ping("google.com");
console.log("Google reachable:", canPing);

const ips = await network.resolveDNS("example.com");
console.log("Example.com IPs:", ips);
```

## 📦 Dépendances

-   https
-   os
-   dns/promises
