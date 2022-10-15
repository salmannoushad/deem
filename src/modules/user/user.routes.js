const { getUsers, signUp, login, update, getSignedInUserProfile, logout} = require('./user.controller')
 
module.exports = function (app) {    
    app.get("/users", getUsers)
    app.post("/api/users/signup", signUp)
    app.post("/api/users/login", login)
    app.put("/api/users/update/:id", update)
    app.get("/api/users/profile", getSignedInUserProfile)
    app.post("/api/users/logout", logout)
}