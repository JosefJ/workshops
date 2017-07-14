Instructions on how to run apps build during the workshops:

## Setup
you can either install embark following up the installation here:
https://github.com/iurimatias/embark-framework

 OR

 you can use following docker image:
#### Start a container
```
$ docker pull buben42/workshops
$ docker run -it -p 8000:8000 -p 8545:8545 --name workshop -v <path host>:/workshops buben42/workshops bash
```


#### (Option 1) IF connecting from host to VM:
Start embark demo server with local testRPC (node simulator)
(0.0.0.0 ensures access thought localhost outside of the VM)
```
$ testrpc -h 0.0.0.0
```

#### (Option 2) IF inside of a VM:
Start embark demo server with local testRPC (node simulator) IF not using VM
```
$ cd workshop<number>
$ embark simulator
```

#### Start embark webserver
press ctrl+p+q to leave the container OR start another terminal
```
$ docker exec -it workshop bash
$ cd workshop<number>
$ embark run
```

#### Access the app

Open: localhost:8000 in your browser (without Metamask extension - with Metamask you don't have to run a node)

#### Start embark with testnet (connects to my testnet node)
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

### Broswer solidity
https://ethereum.github.io/browser-solidity/