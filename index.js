'use strict';

const Hapi = require('@hapi/hapi');
// comment after first run
// const db = require('./app/config/db.js');
const routes = require('./app/routes');
const log = require('./app/tools/loging')

const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0'
});
// comment after first run
// db.sequelize.sync({ force: true }).then(() => {
//     initial();
// });
// comment after first run
// function initial() {
//     db.role.create({
//         id: 1,
//         name: "USER"
//     });

//     db.role.create({
//         id: 2,
//         name: "ADMIN"
//     });
// }

const main = async () => {
    try{
    await server.route(routes);
    await server.start()
    } catch (err) {
        console.log(err)
    }
    console.log('Server running at:', server.info.uri)
    server.events.on('response', (request) => {
        log(request);
    });
    return server
};

main()