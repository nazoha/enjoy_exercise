var koa = require('koa');
var app = koa();

app.use(function* (next){
    console.log(1);
    yield next;
    console.log(2);
    yield next;
    console.log(3);
});

app.use(function* (next){
    console.log(4);
    this.body = 'Hello World';
    yield next;
    console.log(5);
    yield next;
});

app.use(function* (next){
    console.log(6);
    yield next;
    console.log(7);
    yield next;
    console.log(8);
});

app.listen(3000);