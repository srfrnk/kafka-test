FORCE:

build:
	docker-compose build

run: build
	docker-compose up -d kafka zookeeper
	until docker-compose logs kafka | grep 'Startup complete.' > /dev/null; do sleep 1; done
	docker-compose logs kafka | sed -ne "s/^.*Kafka version : \([0-9\.]*\).*$$/Kafka Version: \1/p"
	docker-compose up test

stop:
	docker-compose down

restart-docker:
	service docker restart
