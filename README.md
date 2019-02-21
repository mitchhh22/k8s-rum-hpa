# k8s-rum-hpa
Demo of Kubernetes Horizontal Pod Autoscaler using custom RUM data as scaling metric. 
Based on [Akamai's Boomerang](https://github.com/akamai/boomerang) and [Boomcatch](https://github.com/springernature/boomcatch) beacon metric receiver.

Metrics are pushed to statsd_prometheus_exporter which is then scraped and stored by prometheus. 
Kubernetes HPA can then use these metrics using the k8s prometheus adapter. 

Currently only the roundtrip 99th percentile rt.load time is used but boomerange exposes many more metrics with different plugins.

## Architecture:
```
+----------------------+           +-------------------+                       +--------------+     +--------------------+     +----------------+
|  Frontend/Boomcatch  |---(UDP)-->|  statsd_exporter  |<---(scrape/metrics)---|  Prometheus  |<----| Prometheus Adapter |<----| K8s Custom HPA |
+----------------------+           +-------------------+                       +--------------+     +--------------------+     +----------------+
```


# Setup
### Install prometheus-statsd-exporter
```
kubectl apply -f ./prometheus-statsd
```
### Install prometheus
```
kubectl apply -f ./prometheus
```
### Install prometheus k8s adapter
```
kubectl apply -f ./prometheus-adapter
```
### Install frontend
```
kubectl apply -f ./frontend
```
### Install custom metric HPA
```
kubectl apply -f ./hpa
```
### Test
```
kubectl get --raw "/apis/custom.metrics.k8s.io/v1beta1/namespaces/default/services/*/mystats_rum_rt_load"
```
You should see something like this:
```
{"kind":"MetricValueList","apiVersion":"custom.metrics.k8s.io/v1beta1","metadata":{"selfLink":"/apis/custom.metrics.k8s.io/v1beta1/namespaces/default/services/%2A/mystats_rum_rt_load"},"items":[{"describedObject":{"kind":"Service","namespace":"default","name":"statsd-exporter","apiVersion":"/v1"},"metricName":"mystats_rum_rt_load","timestamp":"2019-02-21T02:04:25Z","value":"139"}]}
```

# Usage
- Watch k8s hpa resource: `kubectl get hpa -w`
- Hit the external IP created via k8s frontend service a few times
- Watch HPA scale pods up and down for custom metric being out of target latency (defaults to 20ms)

