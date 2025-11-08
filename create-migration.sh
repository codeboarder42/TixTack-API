#!/bin/bash

NAME=$1

npm run build
npx typeorm-ts-node-commonjs migration:create migrations/$NAME
