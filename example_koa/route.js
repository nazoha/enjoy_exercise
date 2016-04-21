var koa = require('koa');
var _ = require('koa-route');
var app = koa();

app.use(_.get('/', function *() {
    this.body = 'Hello world!';
})).
    use(_.get('/users/:name', function *(name) {
    this.body = 'Hello, ' + name + '!';
}));

app.listen(3000);