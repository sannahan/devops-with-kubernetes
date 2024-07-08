```
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
```

```
kubectl apply -f manifests/deployment.yaml 
```

```
kubectl apply -f manifests/service.yaml 
```

```
curl localhost:8082                        
<h1>Hello World!</h1>%     
```

