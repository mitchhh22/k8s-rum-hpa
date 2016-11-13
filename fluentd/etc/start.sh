#!/bin/sh

gem install fluent-plugin-elasticsearch
exec fluentd -c /fluentd/etc/$FLUENTD_CONF -p /fluentd/plugins $FLUENTD_OPT
