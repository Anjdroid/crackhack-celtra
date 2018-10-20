# Celtra Hackaton - Employees server

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Database
* Initialize Postgres database with [base.sql](../db/employees/base.sql)
* Run the server with `npm run dev`
* Update server URL in [base.sql](../script/employees.py) and run
``` bash
cd scripts
python employees.py
```
