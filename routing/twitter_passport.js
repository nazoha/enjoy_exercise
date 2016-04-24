const passport = require('koa-passport');
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new TwitterStrategy(require('../config/consumer'), function (token, tokenSecret, profile, done) {
        passport.session.id = profile.id;
        profile.token = token;
        profile.tokenSecret = tokenSecret;
        process.nextTick(function () {
            return done(null, profile);
        });
        done(null, profile);
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
};