# Celtra Hackaton - Kudos server

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Database
* Initialize Postgres database with [base.sql](../db/kudos/base.sql)
* Run the server with `npm run dev`
* Update server URLs in [base.sql](../script/kudos.py) with your Kudos and Employee urls and run
``` bash
cd scripts
python kudos.py
```
