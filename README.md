# Boom
An application latency testing tool based on [Boomerang](https://github.com/SOASTA/boomerang).
Multiple images are downloaded in the background and used to measure the throughput and connection latency. Once the test is done (~3-5 seconds) the data, including all client data shown on the page, is sent back via a websocket. The socketio logs are collected by fluentd and then sent to elasticsearch. Analysis can then be done on Kibana. 

## Demo
### Connection Test
[http://boom.mitchellharding.com](http://boom.mitchellharding.com)

### Kibana
[http://boom.mitchellharding.com:5601](http://boom.mitchellharding.com:5601)

## Installation

```sh
$ docker-compose build
$ docker-compose up -d
```

