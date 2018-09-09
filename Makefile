FORCE:

build:
	docker-compose build

run1: build
	docker-compose up -d kafka zookeeper
	watch -n 1 "docker-compose logs kafka | grep 'Kafka version'"

run2: build
	docker-compose up test
