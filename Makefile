CONTAINER_SERVER = pinguiz-server
COMPOSE_DEV = docker-compose.dev.yml
COMPOSE_1 = docker-compose.1.yml
COMPOSE_2 = docker-compose.2.yml
VOLUME_NAME = pinguizz_db-data-pinguiz

run:
	docker compose -f $(COMPOSE_DEV) up

rund:
	docker compose -f $(COMPOSE_DEV) up -d

build:
	docker compose -f $(COMPOSE_DEV) up --build

down:
	docker compose -f $(COMPOSE_DEV) down

reset:
	docker compose -f $(COMPOSE_DEV) down
	docker volume rm $(VOLUME_NAME) || true
	docker compose -f $(COMPOSE_DEV) up 

prune:
	docker system prune -a --volumes