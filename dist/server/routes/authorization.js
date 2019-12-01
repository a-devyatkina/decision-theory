var config = require('../config.json')
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var YandexStrategy = require('passport-yandex').Strategy
var MailruStrategy = require('passport-mail').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy
var CustomStrategy = require('passport-custom').Strategy
var firebase = require("../firebase/index.js")
var registration = require("../registration/index.js")
const url = require('url')

async function validateProfile(req, profile, done) {
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
        if (req.session.regrequest) {
          done('this email already used', null);
        } else {
          done(null, user);
        }
      } else {
        if (req.session.regrequest) {
          let snapshot = await firebase
            .database()
            .ref("registrations")
            .orderByChild("email")
            .equalTo(profile.emails[0].value)
            .once("value");
          if (snapshot.exists()) {
            done('request for registration already done', null);
          } else {
            req.session.regrequest.email = profile.emails[0].value
            done(null, { uid: '', role: 'guest' });
          }
        } else {
          done("unknown user", null);
        }
      }
    } catch (error) {
      done("unknown user", null);
    }
  } else {
    done("empty email", null);
  }
}

passport.use(new CustomStrategy(function(req, done) {
  firebase.auth().verifyIdToken(req.body.idToken, true)
    .then(decodedToken => {
      if ('email' in decodedToken) {
        return firebase.database().ref("admin")
          .orderByChild("email")
          .equalTo(decodedToken.email)
          .once("value")
      }
      done("no such admin", null)
    })
    .then(snapshot => {
      if (snapshot && snapshot.exists()) {
        let info = snapshot.val()
        return done(null, {uid: Object.keys(snapshot.val())[0], role: 'root'})
      }
      done("unknown user", null)
    })
    .catch(error => {
      if (error.code == 'auth/id-token-revoked') {
        done('Access token has been revoked. It is need to relogin.', null)
      } else {
        done('wrong access token', null)
      }
    })
  }
));

passport.use(new YandexStrategy(config.authorization.yandex, function (req, accessToken, refreshToken, profile, done) {
  validateProfile(req, profile, done)
}))

passport.use(new MailruStrategy(config.authorization.mailru, function (req, accessToken, refreshToken, profile, done) {
  validateProfile(req, profile, done)
}))

passport.use(new GoogleStrategy(config.authorization.google, function(req, accessToken, refreshToken, profile, done) {
  validateProfile(req, profile, done);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (user, cb) {
  cb(null, user)
})

function checkForRootAccess(req, res, next) {
  if (req.isAuthenticated() && req.session.passport.user.role === 'root') {
      return next();
  }
  res.status(500).send('access denyed');
}

module.exports.init = function (app) {

  app.use(session(config.authorization.session))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(cookieParser())

  app.post('/auth/token', passport.authenticate('custom'), (req, res) => {
    if (req.isAuthenticated()) {
      return res.status(200).send()
    }
    return res.status(401).send()
  })

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
    if ('regrequest' in req.session) {
      let regrequest = req.session.regrequest
      delete req.session.regrequest
      return registration.createRegRequest(regrequest, (rid, error) => {
        if (error) {
          return res.status(500).send(error)
        }
        return res.redirect('/registration?rid=' + rid)
      })
    }
    firebase.auth().createCustomToken(req.session.passport.user.uid)
      .then(function (token) {
        return res.cookie('custom_token', token).redirect('/')
      })
      .catch(function (error) {
        return res.status(500).send(error)
      });
  })

  app.get('/regrequest/:provider', (req, res) => {
    req.session.regrequest = url.parse(req.url, true).query
    return res.redirect(`/auth/${req.params.provider}/custom-token`)
  })

  app.post('/regrequest/accept', checkForRootAccess, (req, res) => {
    let rid = url.parse(req.url, true).query.rid
    registration.acceptRegRequest(rid, error => {
      if (error) {
        return res.status(500).send(error)
      }
      return res.status(200).send()
    })
  })

  app.post('/regrequest/reject', checkForRootAccess, (req, res) => {
    let rid = url.parse(req.url, true).query.rid
    registration.rejectRegRequest(rid, error => {
      if (error) {
        return res.status(500).send(error)
      }
      return res.status(200).send()
    })
  })

  app.get('/auth-error', (req, res) => {
    res.status(500).send('not authenticated')
  })
}
