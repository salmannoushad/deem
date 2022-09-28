const { getUsers, signup, login, update } = require('./user.controller')
 
module.exports = function (app) {    
    app.get("/users", getUsers)
    app.post("/api/user/signup", signup)
    app.post("/api/user/login", login)
    app.put("/api/user/update/:id", update)
}