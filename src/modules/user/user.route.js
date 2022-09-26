const { getUsers, createUser } = require('./user.controller')

module.exports = function (app) {    
    app.get("/users", getUsers)

    app.post("/users", createUser)
}