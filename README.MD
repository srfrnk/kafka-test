# Test node-kafka with Kafka inside docker

# Install

You need to have:
* docker
* docker-compose
* make

# Build

Run
```bash
make build
```

# Test

Make sure you're using the correct Kafka version for your test.
Open file `docker-compose.yml` and look for:
```docker-compose
  kafka:
    image: wurstmeister/kafka:1.1.0
    # image: wurstmeister/kafka:latest
```

Comment/uncomment the correct version to use.

**If running already:** Stop and re-run.

Run:
```bash
make run
```

If all hell breaks loose (and nothing works) try:
```bash
make restart-docker
```
