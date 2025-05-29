#!/bin/sh

echo "⏳ Attente du master..."
until nc -z pinguiz-sql 3306; do
    echo "🕒 En attente de mariadb..."
    sleep 2
done
echo "✅ Base mariadb prête"

echo "⏳ Attente du réplica..."
until nc -z pinguiz-sql-replica 3306; do
    echo "🕒 En attente du réplica..."
    sleep 2
done
echo "✅ Réplica prêt"

echo "📦 Lancement du serveur..."
bun install
bun --watch src/app.ts
