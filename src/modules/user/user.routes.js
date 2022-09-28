const { getUsers, signUp, login, update, getSignedInUserProfile, logout} = require('./user.controller')
 
module.exports = function (app) {    
    app.get("/users", getUsers)
    app.post("/api/user/signup", signUp)
    app.post("/api/user/login", login)
    app.put("/api/user/update/:id", update)
    app.get("/api/user/profile", getSignedInUserProfile)
    app.post("/api/user/logout", logout)
}