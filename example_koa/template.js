var koa = require('koa');
var _ = require('koa-route');
var views = require('co-views');
var serve = require('koa-static');
var app = koa();

var render = views(__dirname + '/views', {ext: 'jade'});

var title = 'koa-example';
//
app.use(serve(__dirname + '/JADE-Bootstrap'));


app.use(_.get('/', function *() {
    this.body = yield render('index', {
        title: title
    });
})).use(_.get('/users/:name', function *(name) {
    this.body = yield render('user', {
        title: name + ' _ ' + title,
        user: {
            name: name
        }
    });
}));

app.on('error', function *(err) {
    log.error(err);
});

app.listen(3000);