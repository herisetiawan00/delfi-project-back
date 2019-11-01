const Boom = require('@hapi/boom')
const db = require('../config/db.js');
const config = require('../config/config.js');
const User = db.user;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.list = async (request, h) => {
    let token = request.headers['x-access-token'] || request.headers['authorization'];

    if (!token) {
        return Boom.forbidden('Token not provided')
    }

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    try {
        jwt.verify(token, config.secret, (err, decoded) => {
            request.userId = decoded.id;
        });
    } catch (error) {
        return Boom.forbidden('Token mismatch')
    }
    if (request.userId !== null) {
        const user = await User.findByPk(request.userId).catch(err => {
            return Boom.badImplementation(err)
        })

        const role = await user.getRoles().catch(err => {
            return Boom.badImplementation(err)
        })

        if (role[0].name.toUpperCase() === 'ADMIN') {
            let users = await User.findAll({
                attributes: ['name', 'username', 'email'],
            }).catch(err => {
                return Boom.badImplementation(err)
            })
            return h.response([{ auth: true, users: users }]).code(200)
        } else {
            return Boom.forbidden('You\'re not allowed to see this')
        }
    } else {
        return Boom.forbidden('Token mismatch')
    }
}