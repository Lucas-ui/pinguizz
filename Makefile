CONTAINER_SERVER = pinguiz-server
COMPOSE_DEV = docker-compose.dev.yml
COMPOSE_PROD = docker-compose.devprod.yml
COMPOSE_1 = docker-compose.1.yml
COMPOSE_2 = docker-compose.2.yml
VOLUME_NAME = pinguizz_db-data-pinguiz

run:
	docker compose -f $(COMPOSE_DEV) up --scale server=2 --scale client=2

rund:
	docker compose -f $(COMPOSE_DEV) up -d --scale server=2 --scale client=2

build:
	docker compose -f $(COMPOSE_DEV) up --build

down:
	docker compose -f $(COMPOSE_DEV) down

reset:
	docker compose -f $(COMPOSE_DEV) down
	docker volume rm $(VOLUME_NAME) || true
	docker compose -f $(COMPOSE_DEV) up --scale server=2 --scale client=2
	

runprod:
	docker compose -f $(COMPOSE_PROD) up --scale server=2 --scale client=2

rundprod:
	docker compose -f $(COMPOSE_PROD) up -d --scale server=2 --scale client=2

buildprod:
	docker compose -f $(COMPOSE_PROD) up --build

downprod:
	docker compose -f $(COMPOSE_PROD) down

resetprod:
	docker compose -f $(COMPOSE_PROD) down
	docker volume rm $(VOLUME_NAME) || true
	docker compose -f $(COMPOSE_PROD) up --scale server=2 --scale client=2

prune:
	docker system prune -a --volumes
    docker volume rm $(docker volume ls -q)