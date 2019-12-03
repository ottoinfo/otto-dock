# Docker Setup

If you have never setup Docker, this will be a quick run down

### Install docker

```sh
brew cask install docker
```

### Create your first container

```sh
docker-machine create --driver=virtualbox --virtualbox-memory=4096 --virtualbox-disk-size=100000 default
```

> Make sure you are in docker-machine context (optional):

```sh
eval "$(docker-machine env default)"
```

> Beef up your Docker-machine by running (optional):

```sh
docker-machine stop
VBoxManage modifyvm default --cpus 4
VBoxManage modifyvm default --memory 4096
docker-machine start
```

> Switch to nfs volumes (shared directory) mounts for speed improvements (optional):

```sh
brew install docker-machine-nfs
docker-machine-nfs default --force
```

### Setup Local Host

> get the ip of "docker-machine", usually yields 192.168.99.100

```sh
docker-machine ip
```

> edit your local `/etc/hosts` file, add the following line

```
192.168.99.100 local.otto-express.com
```
