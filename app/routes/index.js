var auth = require('./auth');
var user = require('./user');
var test = require('./test');

module.exports = [].concat(auth, user, test);