# House renting app setup

[![Coverage Status](https://coveralls.io/repos/github/robocopkaka/house-renting-app/badge.svg?branch=ft-setup-circle-and-coverage)](https://coveralls.io/github/robocopkaka/house-renting-app?branch=ft-setup-circle-and-coverage)

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
`src/config/config.js`
* Clone this repository
* Create a `.env` file in the root of the project and add the following 
key-value pairs - `DB_USER` and `DB_PASSWORD` which should be the credentials
for your database.
Create a secret key for authentication as shown in the `env.sample` file
* Run `yarn` or `yarn install` to install all dependencies
* Run `yarn build` to build the app
* Run `npx sequelize-cli db:migrate`/ `sequelize db:migrate` to run the current migration which adds
a `User` table with an email field to your development database
* To start the app, run the following:
  - `yarn watch` to watch for changes
  - `yarn start:dev` in a different terminal to start the application

## Scripts
* `yarn watch` - to watch for file changes. Should be run in a different terminal window
* `yarn dev`/`yarn start:dev` - starts the development server
* `yarn test`/`yarn run test` - to test app
* `yarn build`/`yarn run build` - creates a production ready version of the application
* `yarn serve`/`yarn start` - serves a production ready version of the application

## Directory structure

* `/config` - contains Sequelize configuration
* `/controllers` - controllers related code. Helps move a lot of logic away from
routes
* `src/migrations` - sequelize migrations are stored here
* `src/models` - model definitions are stored here
* `src/routes` - for defining routes
* `src/seeders` - you can define functions here to help you seed your database
* `src/tests` - for integration tests
* `.babelrc` - Babel config
* `src/app.js` - general application settings
* `package.json` - details of installed packages and scripts