Project for working with Youtube API.

## How to run

1. Check pre-installed docker and docker-compose on your machine

2. copy and rename docker-compose.yaml-example to docker-compose.yaml

3. copy and rename src/_config/config.ini-example to config.ini

3. open console at the main project directory and run the following command:

```
docker-compose up --build
```

To stop app press Ctrl + c.

### Additional info

- You can find admin panel by following http://localhost/admin

- If you are already have runnig instace at port 80, go to the docker-compose.yaml and change at frontend app port to "<new_port>:80" and change port to new at src/config.ini at cors_origin_white_list.

- To stop and remove all containers run the following command: 

```
docker-compose down --rmi all -v --remove-orphans
```

- To create superuser run the following command:

```
docker-compose run app python manage.py createsuperuser
```
