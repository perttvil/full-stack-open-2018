#!/bin/sh
npm run build

rm -rf ../osa3/build
rm -rf ../../heroku-api/build

cp -r build ../osa3/ -v
cp -r build ../../heroku-api/ -v
