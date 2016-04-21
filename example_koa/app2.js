var koa = require('koa');
var request = require('request-promise');
var app = koa();

app.use(function *() {
    var options = {
        uri: 'https://github.com'
    };

    this.body = yield request(options);
});

app.listen(3000);