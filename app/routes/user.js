const user = require('../controller/userController')

module.exports = [{
    method: 'GET',
    path: '/user/list',
    handler: user.list
}]