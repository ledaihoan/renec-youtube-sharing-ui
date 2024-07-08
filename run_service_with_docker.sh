#!/usr/bin/env bash
IMAGE_NAME=renec-yt-sharing-ui
CONTAINER_NAME=renect-yt-sharing-ui
docker build -t $IMAGE_NAME .
docker run --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME