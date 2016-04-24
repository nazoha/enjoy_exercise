const views = require('co-views');
const render = views(__dirname.replace('controller', '') + '/views', {
    ext: 'jade'
});

exports.get = function *() {
    this.body = yield render('introduction');
};