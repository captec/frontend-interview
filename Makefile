MAKEFLAGS += -j2

.PHONY:						\
	backend--start	\
	backend--dev		\
	frontend--start	\
	dev

backend--start:
	cd backend && yarn start

backend--dev:
	cd backend && yarn dev

frontend--start:
	cd frontend && yarn start

dev: backend--dev frontend--start

start: backend--start frontend--start