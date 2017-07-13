Instructions on how to run apps build during the workshops:

## Setup
### Start a container
```
$ docker pull buben42/workshops
$ docker run -it -p 8000:8000 -p 8545:8545 --name workshop -v <path host>:/workshops buben42/workshops bash
```


### Start embark demo server with local testRPC (node simulator) IF accessing VM from a host (0.0.0.0 ensures access thought localhost outside of the
```
$ testrpc -h 0.0.0.0
```

### Start embark demo server with local testRPC (node simulator) IF not using VM
```
$ cd workshop<number>
$ embark simulator
```

press ctrl+p+q to leave the container OR start another terminal
```
$ docker exec -it workshop bash
$ cd workshop<number>
$ embark run
```

### Access the app

Open: localhost:8000 in your browser (without Metamask extension)

### Start embark with testnet (connects to my testnet node)
go to workshop<number> folder
```
$ embark run testnet
```


## Hints
#### Win hints
To enable a shared folder, you first have to enable sharing in the folder properties

#### Mac hints
Struggling to get a shared folder for docker enabled - ping me if you have solution for that




### Docker - useful commands
```
$ docker run <docker params> <container name> <container command> # run a container
$ docker images #list all images
$ docker rmi <image name> #force to remove a docker image
$ docker ps -a #list all docker containers
$ docker rm -f <container name> # force to remove a docker container
$ docker exec <docker params> <container name> <container command> #run a $ second instance of the container
$ docker attach <container name> # connect to a running container
$ docker start <container name> # start a stopped container
$ docker load <new name> < <name of loaded image>
```