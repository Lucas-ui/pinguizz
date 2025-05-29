.PHONY: wait-master wait-replica start-server

wait-master:
	@echo "⏳ Attente de la base master..."
	@until nc -z mariadb 3306; do \
		echo "⏳ master pas prêt, attente..."; \
		sleep 2; \
	done
	@echo "✅ Master prêt !"

wait-replica:
	@echo "⏳ Attente de la réplica..."
	@until nc -z pinguiz-sql-replica 3306; do \
		echo "⏳ réplica pas prête, attente..."; \
		sleep 2; \
	done
	@echo "✅ Réplica prête !"

start-server: wait-master wait-replica
	@echo "🚀 Lancement du serveur"
	@bun install
	@bun --watch src/app.ts