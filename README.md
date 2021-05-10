# Recipedia

Recipedia is an application for finding recipes tailored to a user's specific preferences. It uses the Edamam API for searching for recipes and allows users to save them on Recipedia for later reference.

Based on the CUNY Tech Prep Project Starter, a starter repo for building CUNY Tech Prep projects with React, Express.js, and Sequelize.js.

## Stack

_API_

- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- Passport.js + Bcrypt

_React client_

- Built using React with `create-react-app` and configured to work with the api.
- Bootstrap 4.x added to `/client/public/index.html`
- React Router
- CSS and CSS Modules

### Configuration

Before running the application, you will need to configure various credentails and details. In the project root and `client/` directory, copy the `.env.example` file to `.env` and adjust them to your preferences. You will also need to configure the PostgreSQL database settings at `api/config/config.json`.

### Running the app

For local development you will need two terminals open, one for the api-backend and another for the react-client.

_Clone_ this app, then:

```bash
# api-backend terminal 1
npm install
npm run dev
```

```bash
# react-client terminal 2
cd client
npm install
npm start
```

- api-backend will launch at: http://localhost:8080 by default
- react-client will launch at: http://localhost:3000 by default

> In production you will only deploy a single app. The react client will build into static files that will be served from the backend.

## Deployment

### Setting up Heroku

Install the heroku cli if you don't already have it.

> You will also need a heroku account
> And this will only be done once on your machine

```bash
# on mac
brew install heroku/brew/heroku
heroku login
```

### Create a Heroku project

Next, `cd` into this project directory and create a project:

```bash
heroku create cool-appname
heroku addons:create heroku-postgresql:hobby-dev
```

> This will deploy your apps to https://cool-appname.herokuapp.com, assuming that it is not taken already.

> You only need to do this once per app

### Deploying the app

Whenever you want to update the app run this command.

```bash
git push heroku main
```

> This command deploys your main branch. You can change that and deploy a different branch such as: `git push heroku development`
