CONTAINER_SERVER = pinguiz-server
COMPOSE_DEV = docker-compose.dev.yml
COMPOSE_PROD = docker-compose.prod.yml
COMPOSE_1 = docker-compose.1.yml
COMPOSE_2 = docker-compose.2.yml
VOLUMEREPLICAT = pinguizz_slave-data
VOLUMEMASTER = pinguizz_db-data-pinguiz

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
	docker volume rm $(VOLUMEMASTER) $(VOLUMEREPLICAT)
	docker compose -f $(COMPOSE_DEV) up
	

runprod:
	docker compose -f $(COMPOSE_PROD) up

rundprod:
	docker compose -f $(COMPOSE_PROD) up -d 

buildprod:
	docker compose -f $(COMPOSE_PROD) up --build

downprod:
	docker compose -f $(COMPOSE_PROD) down

resetprod:
	docker compose -f $(COMPOSE_PROD) down
	docker volume rm $(docker volume ls -q)
	docker compose -f $(COMPOSE_PROD) up 

prune:
	docker system prune -a --volumes
	docker volume rm $(docker volume ls -q)
