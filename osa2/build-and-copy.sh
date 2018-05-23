#!/bin/bash

npm run build
cp -r build ../osa3/ -v
cp -r build ../../heroku-api/ -v
