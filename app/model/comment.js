const Boom = require('@hapi/boom')

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comments', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
    })
    Sequelize.Model.find = async function (...args) {
        const obj = await this.findById(...args)
        if (obj === null) throw Boom.notFound()

        return obj
    }
    return Comment;
}