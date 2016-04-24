const _ = require('koa-route');
const require_dir = require('require-dir');
const $ = require_dir('../controller');

module.exports = app => {
    app.use(_.get('/', $.index.get)
    ).use(_.get('/introduction', $.introduction.get)
    ).use(_.get('/auth/twitter', $.auth_login_twitter.get)
    ).use(_.get('/auth/twitter/callback', $.callback.get)
    );
};