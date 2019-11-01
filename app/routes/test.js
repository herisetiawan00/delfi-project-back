module.exports = [{
    method: 'GET',
    path: '/test',
    handler: async (request, h) => {
        return h.response({status: "success", code: 200}).code(200)
    }
}]