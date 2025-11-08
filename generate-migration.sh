#!/bin/bash

NAME=$1

npm run build
npx typeorm-ts-node-commonjs migration:generate -d dist/src/ormconfig.js migrations/$NAME