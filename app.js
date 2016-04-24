const koa = require('koa');
const views = require('co-views');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const json = require('koa-json');
const session = require('koa-session');
const passport = require('./routing/twitter_passport');
const route = require('./routing/route');
const app = koa();

app.use(logger());
app.use(bodyParser());
app.keys = ['secret'];
app.use(session(app));
app.use(json());
app.use(serve(__dirname + '/public/dist/JADE-Bootstrap'));

passport(app);

route(app);

app.listen(3000);

module.exports = app;