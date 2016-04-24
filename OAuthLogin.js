var koa = require('koa');
var passport = require('koa-passport'),
    TwitterStrategy = require('passport-twitter').Strategy;
var session = require('koa-session');
var _ = require('koa-route');
var serve = require('koa-static');
var views = require('co-views');
var bodyparser = require('koa-bodyparser');
var convert = require('koa-convert');
var app = koa();

var TWITTER_CONSUMER_KEY = 'NEDKgGyLgiGrQcW2NyJ2vlx7c';
var TWITTER_CONSUMER_SECRET = 'jfTijTUvFGPzcxEE5YcTlZ0TUFIT0z7yZWPoReHHfeFOfSYgtt';

var render = views(__dirname + '/views', {ext: 'jade'});

var title = "E2";

app.use(serve(__dirname + '/public/dist/JADE-Bootstrap'));

app.keys = ['secret'];
app.use(session(app));

app.use(bodyparser());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new TwitterStrategy( {
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
}, function (token, tokenSecret, profile, done) {
    passport.session.id = profile.id;
    profile.token = token;
    profile.tokenSecret = tokenSecret;
    process.nextTick(function () {
        return done(null, profile);
    });
    done(null, profile);
    }
));

app.use(_.get('/', function *() {
    this.body = yield render('index', {
        title: title,
        body: {
            user: "test"
        }
    });
})).use(_.get('/auth/twitter', passport.authenticate('twitter')
)).use(_.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/introduction'
}))).use(_.get('/introduction', function *() {
    this.body = yield render('introduction', {
        title: title
    });
}));

app.on('error', function *(err) {
    console.log(err);
});

app.listen(3000);