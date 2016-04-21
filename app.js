var koa = require('koa');
var _ = require('koa-route');
var views = require('co-views');
var serve = require('koa-static');
var app = koa();

var render = views(__dirname + '/views', {ext: 'jade'});
app.use(serve(__dirname + '/public/dist/JADE-Bootstrap'));

var title = "E2";

app.use(_.get('/', function *() {
    this.body = yield render('index', {
        title: title,
        body: {
            user: "test"
        }
    });
})).use(_.get('/introduction', function *() {
    this.body = yield render('introduction', {
        title: title
    });
})).use(_.get('/login', function *() {
    this.body = yield render('login', {
        title: title
    });
})).use(_.get('/login', function *() {
    
}));

app.on('error', function *(err) {
    console.log(err);
});

app.listen(3000);