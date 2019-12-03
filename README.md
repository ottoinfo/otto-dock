# Otto-Dock(er)

This is a simple repo to get you started testing and running Multiple Services & 2 Express Apps in a local environment using docker.

### Docker Services

Current Services ( `Image Name` )

- Nginx - `nginx_service`

- Express ( 2 instances FE & BE ) - `be_express_service` & `fe_express_service`

- MySQL - `mysql_db_service`

- Redis - `redis_cache_service`

> Configurations `.env` make sure to update the locations of `CODEBASES`. You can update other configurations in this file.

```
NGINX_CODEBASE_DIR=~/Projects/otto-dock/apps/nginx_service/www/html
NGINX_CONF=~/Projects/otto-dock/apps/nginx_service/conf.d
FE_EXPRESS_CODEBASE_DIR=~/Projects/otto-dock/apps/fe_express_service
BE_EXPRESS_CODEBASE_DIR=~/Projects/otto-dock/apps/be_express_service

```

> Start Docker, build images from `docker-compose.yml`

```sh
docker-compose up
```

> All Docker Containers will be run from on window

![Screen Shot 2019-12-02 at 6 54 01 PM](https://user-images.githubusercontent.com/643526/70016583-94ac6f00-1535-11ea-807c-79ec58f660e2.jpg)

> Stop Docker, you should be able to `ctrl + c`

```sh
docker-compose down
```

> Check if Images are Running

```sh
docker ps
```

![Screen Shot 2019-12-02 at 7 08 13 PM](https://user-images.githubusercontent.com/643526/70017119-2072cb00-1537-11ea-9c51-c4e9c4975739.jpg)

> To ssh into a container, Example Nginx

```sh
docker exec -t -i nginx_service sh
```

### Folder Structure

Apps will conain all `SRC` code to run each service.

Docker will contain the service along with the `Dockerfile` to build an image.

> **Redis & MySQL images will be built from Docker Hub**

```
└── apps
│   └── be_express_service
│   └── fe_express_service
│   └── be_express_service
│   └── nginx_service
│   └── simple_express
|
└── docker
│   └── be_express_service
│     └── Dockerfile
│   └── fe_express_service
│   └── nginx_service
|
|   .env
|   docker-compose.yml

```

### Express Services

There will be two services available to test out.

- FrontEnd/Clientside (`fe_express_service`) - This is a NextJS/React app for rendering front end components and layouts.

- BackEnd/API (`be_express_service`) - This will be a Express server for logging in and hitting api endpoints.

> **`apps/simple_express` is just an app to run outside Docker, to test API's and Express**

### Nginx

Will be used as a proxy service for Node/Express Services.

### Resources

[supertest](https://github.com/visionmedia/supertest)
