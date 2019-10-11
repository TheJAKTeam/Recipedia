# Project Starter 
A starter repo for building CUNY Tech Prep projects with React, Express.js, and Sequelize.js

## Stack

*API*

- express.js
- sequelize.js

*React client*

- Built using `create-react-app` and configured to work with the api.
- Bootstrap 4.x added to `/client/public/index.html`
- React Router

*Project Structure*

```
.
├── README.md
├── api
│   ├── app.js
│   ├── config
│   │   └── config.json
│   ├── controllers
│   │   ├── appConfig.js
│   │   ├── index.js
│   │   └── posts.js
│   └── models
│       ├── index.js
│       └── post.js
├── client
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── components
│       │   ├── Loading.js
│       │   └── Post.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── pages
│       │   ├── AboutUsPage.js
│       │   ├── PostFormPage.js
│       │   ├── PostsListPage.js
│       │   └── ShowPostPage.js
│       └── serviceWorker.js
├── package-lock.json
└── package.json
```


## Dev Setup

Each team member will need to do this on their local machine.

### Create a postgres db

Create a user in postgres named `ctp_user` with the password `ctp_pass`:

> This only needs to be done one time on your machine
> You can create additional users if you want to.

```
createuser -P -s -e ctp_user
```

Create a separate db for this project:

```
createdb -h localhost -U ctp_user MYAPPNAME_development
```

> You will create a DB for each project you start based on this repo.

*For more details see this [installing postgres guide](https://github.com/CUNYTechPrep/ctp2019/blob/master/guides/installing-postgresql.md)*

### Running the app

For local development you will need two terminals open, one for the api-backend and another for the react-client.

```bash
# api-backend
npm install
npm run dev
```

```bash
# react-client
cd client
npm install
npm start
```

- api-backend will launch at: http://localhost:8080
- react-client will launch at: http://localhost:3000

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
git push heroku master
```

> This command deploys your master branch. You can change that and deploy a different branch such as: `git push heroku development`

