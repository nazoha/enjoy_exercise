var koa = require('koa');
var app = koa();

app.use(function *() {
    var count = ~~this.cookies.get('count') + 1;
    this.cookies.set('count', count);
    this.body = 'count:' + count;
});

app.listen(3000);