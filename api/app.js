require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const FileStore = require("session-file-store")(session);

const app = express();
const PORT = process.env.PORT;
const db = require("./models");
const { User } = db;

// Initialize middleware
app.use(cors());
app.use(
  session({
    key: "session",
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Email and password auth
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      // Try to find the logging in user in the database
      const foundUser = await User.findOne({
        where: {
          email: email,
        },
      });

      // Check if a user was found
      if (foundUser === null) {
        return done(null, false);
      }

      // Try to authenticate the user
      const isPasswordCorrect = await bcrypt.compare(
        password,
        foundUser.hashedPassword
      );

      if (isPasswordCorrect) {
        return done(null, foundUser);
      } else {
        return done(null, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializing user: " + user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("serializing user with id: " + id);
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

// this lets us parse 'application/json' content in http requests
app.use(express.json());

// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(logFormat));

// this mounts controllers/index.js at the route `/api`
app.use("/api", require("./controllers"));

// for production use, we serve the static react build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // all unknown routes should be handed to our react app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// update DB tables based on model updates. Does not handle renaming tables/columns
// NOTE: toggling this to true drops all tables (including data)
db.sequelize.sync({ force: false });

// start up the server
if (PORT) {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
} else {
  console.log("===== ERROR ====\nCREATE A .env FILE!\n===== /ERROR ====");
}
