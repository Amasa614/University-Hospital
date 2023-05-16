const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Replace this with your own user database fetch function
const users = [];

function getUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

async function authenticateUser(email, password, done) {
  const user = getUserByEmail(email);
  if (user == null) {
    return done(null, false, { message: "No user found with that email" });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password incorrect" });
    }
  } catch (e) {
    console.log(e);
    return done(e);
  }
}

function initialize(passport) {
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    done(null, getUserById(id));
  });
}

module.exports = initialize;
