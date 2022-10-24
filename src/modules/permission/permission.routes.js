const { createPermission } = require('./permission.controller')

module.exports = function(app) {
    app.get('/api/permissions', createPermission )
}