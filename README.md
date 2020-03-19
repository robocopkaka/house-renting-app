# House renting app setup

### Versions
* Node - 10.19.0
* NPM - 6.13.7
* Yarn - 1.22.0

## Prerequisites
* You should have Postgresql installed
* The project currently uses `Yarn` so you should have Yarn installed (Subject to change in the future)

## Setting up the project
* Create these two databases with Postgres - `house-renting-app-development`
and `house-renting-app-test`. For more information about this, you can check out
`config/config.js`
* Clone this repository
* Create a `.env` file in the root of the project and add the following 
key-value pairs - `DB_USER` and `DB_PASSWORD` which should be the credentials
for your database
* Run `yarn` or `yarn install` to install all dependencies
* Run `sequelize db:migrate` to run the current migration which adds
a `User` table with an email field to your development database

## Scripts
* `yarn dev`/`yarn run dev` - starts the development server
* `yarn test`/`yarn run test` - starts the development server
* `yarn build`/`yarn run build` - creates a production ready version of the application
* `yarn serve`/`yarn run serve` - serves a production ready version of the application

## Directory structure

* `/bin/www` - app entry point
* `/config` - contains Sequelize configuration
* `/controllers` - controllers related code. Helps move a lot of logic away from
routes
* `/migrations` - sequelize migrations are stored here
* `/models` - model definitions are stored here
* `/routes` - for defining routes
* `/seeders` - you can define functions here to help you seed your database
* `/tests` - for integration tests
* `.babelrc` - Babel config
* `app.js` - general application settings
* `package.json` - details of installed packages and scripts