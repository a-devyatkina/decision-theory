var config = require('../config.json')
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var YandexStrategy = require('passport-yandex').Strategy
var MailruStrategy = require('passport-mail').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy
var firebase = require("../firebase/index.js")

async function validateProfile(profile, done) {
  if (profile && profile.emails[0] && profile.emails[0].value) {
    try {
      let user = null;
      let snapshot = await firebase
        .database()
        .ref("students")
        .orderByChild("email")
        .equalTo(profile.emails[0].value)
        .once("value");
      if (snapshot.exists()) {
        user = { uid: Object.keys(snapshot.val())[0], role: "student" };
      } else {
        let snapshot = await firebase
          .database()
          .ref("teachers")
          .orderByChild("email")
          .equalTo(profile.emails[0].value)
          .once("value");
        if (snapshot.exists()) {
          user = { uid: Object.keys(snapshot.val())[0], role: "teacher" };
        }
      }
      if (user) {
        done(null, user);
      } else {
        done("unknown user", false);
      }
    } catch (error) {
      done("unknown user", false);
    }
  } else {
    done("empty email", false);
  }
}

passport.use(new YandexStrategy(config.authorization.yandex, function (req, accessToken, refreshToken, profile, done) {
  validateProfile(profile, done)
}))

passport.use(new MailruStrategy(config.authorization.mailru, function (req, accessToken, refreshToken, profile, done) {
  validateProfile(profile, done)
}))

passport.use(new GoogleStrategy(config.authorization.google, function(req, accessToken, refreshToken, profile, done) {
  validateProfile(profile, done);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (user, cb) {
  cb(null, user)
})

module.exports.init = function (app) {

  app.use(session(config.authorization.session))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(cookieParser())

  app.get('/auth/yandex/custom-token', passport.authenticate('yandex'))

  app.get('/auth/yandex/callback', passport.authenticate('yandex', {
      failureRedirect: '/auth-error',
      successRedirect: '/custom-token'
  }))

  app.get('/auth/mailru/custom-token', passport.authenticate('mailru'))

  app.get('/auth/mailru/callback', passport.authenticate('mailru', {
    failureRedirect: '/auth-error',
    successRedirect: '/custom-token'
  }))

  app.get('/auth/google/custom-token', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' }))

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth-error',
    successRedirect: '/custom-token'
  }))

  app.get('/custom-token', (req, res) => {
    firebase.auth().createCustomToken(req.session.passport.user.uid)
      .then(function (token) {
        res.cookie('custom_token', token).redirect('/')
      })
      .catch(function (error) {
        res.status(500).send(error)
      });
  })

  app.get('/auth-error', (req, res) => {
    res.status(500).send('not authenticated')
  })
}
