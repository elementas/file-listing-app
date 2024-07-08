# File listing app

Application scans `APP_PATH` directory, stores the present file names into a Redux store, runs a HTTP server on port `APP_PORT` and exposes 3 paths:
|Path|Method|Description|
|---|---|---|
|/list|`GET`|Lists files defined in the Redux store|
|/scan|`GET`|Scans the `APP_PATH` directory and updates the Redux store|
|/download-state|`GET`|Downloads current state object|

## Environment variables

|Variable|Type|Default|
|---|---|---|
|APP_PORT|`integer`|3000|
|APP_PATH|`string`|`./input`|

## Run the application

```
npm install
npm start
```
OR
```
docker build -t listing-app .
docker run -d --name listing-app -p 3000:3000 --volume ./input:/home/node/app/input listing-app
```
OR
```
docker-compose up -d
```

