CONTAINER_NAME = pinguizz-server

run:
	docker compose -f docker-compose.dev.yml up --build

down:
	docker compose -f docker-compose.dev.yml down

mig:
	@if [ -z "$(name)" ]; then \
		echo "Error: 'name' variable is required. Usage: make mig name=migration_name"; \
		exit 1; \
	fi
	@echo "Starting migration: $(name)"
	@time docker exec $(CONTAINER_NAME) sh -c "bunx prisma migrate dev --create-only --name $(name)"
	@echo "Migration completed"

maj:
	@echo "Checking for failed migrations"
	@docker exec $(CONTAINER_NAME) sh -c "bunx prisma migrate status" || \
	(echo "Resolving failed migrations..." && \
	docker exec $(CONTAINER_NAME) sh -c "bunx prisma migrate resolve --applied $(name)")
	@echo "Applying existing migrations"
	@time docker exec $(CONTAINER_NAME) sh -c "bunx prisma migrate deploy && bunx prisma generate"
	@echo "Migrations applied"

sync:
	docker exec -it $(CONTAINER_NAME) bun run scripts/sync.ts
	# docker exec -it $(CONTAINER_NAME) bun run scripts/categ.ts

seed:
	docker exec -it $(CONTAINER_NAME) bun run scripts/seed.ts	


rmVol:
	docker compose -f docker-compose.dev.yml down
	docker volume rm abyss_db-data-abyss || true

rund:
	docker compose -f docker-compose.dev.yml up --build -d


reset:
	make rund
	echo "⏳ Attente du démarrage complet du serveur..."
	sleep 12  # S'assurer que tout démarre bien
	make sync
	make seed
	echo "✅ Reset terminé !"


test: 
	docker compose -f docker-compose.test.yml up --abort-on-container-exit