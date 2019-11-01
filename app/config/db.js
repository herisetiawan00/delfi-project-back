const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    logging: false,
    host: env.host,
    dialect: env.dialect,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/user.js')(sequelize, Sequelize);
db.role = require('../model/role.js')(sequelize, Sequelize);
db.post = require('../model/post.js')(sequelize, Sequelize);
db.comment = require('../model/comment.js')(sequelize, Sequelize);

db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId' });
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId' });
db.comment.belongsTo(db.post);
db.post.hasMany(db.comment);
db.post.belongsTo(db.user);
db.user.hasMany(db.post);

// role initialization, comment after the first application run
// db.user.sync()
// db.role.sync()
// db.post.sync()
// db.comment.sync()

module.exports = db;