up:
	docker-compose up -d
up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
down:
	docker-compose down
env:
	cp .env.example .env && npm install
database:
	sequelize db:create
migrate:
	sequelize db:migrate
drop:
	sequelize db:drop
rund: 
	npm run dev