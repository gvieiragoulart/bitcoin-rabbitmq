#!/bin/bash

cd bitcoin-candle-generator

docker-compose down

docker-compose up -d --build

yarn start

cd ..

cd bitcoin-candle-api

docker-compose down

docker-compose up -d --build

yarn dev
