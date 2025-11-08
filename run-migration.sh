#!/bin/bash

npm run build
npx typeorm-ts-node-commonjs migration:run -d dist/src/ormconfig.js