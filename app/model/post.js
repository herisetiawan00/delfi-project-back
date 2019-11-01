const Boom = require('@hapi/boom')

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('posts', {
        title: {
            type: Sequelize.STRING,
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
    return Post
}