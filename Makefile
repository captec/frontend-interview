MAKEFLAGS += -j2

.PHONY:							\
	backend--install	\
	backend--start		\
	backend--dev			\
	frontend--install	\
	frontend--start		\
	dev

backend--install:
	cd backend && yarn

backend--start:
	cd backend && yarn start

backend--dev:
	cd backend && yarn dev

frontend--install:
	cd frontend && yarn

frontend--start:
	cd frontend && yarn start

install: backend--install frontend--install

dev: backend--dev frontend--start

start: backend--start frontend--start