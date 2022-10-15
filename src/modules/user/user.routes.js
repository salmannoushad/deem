const { getUsers, signUp, login, update, getSignedInUserProfile, logout} = require('./user.controller')
const validate = require('../core/middlewares/validator.middleware');
const { registerSchema } = require('./register.schema');

module.exports = function (app) {    
    app.get("/users", getUsers)
    app.post("/api/users/signup", validate(registerSchema) ,signUp)
    app.post("/api/users/login", login);
    app.put("/api/users/update/:id", update);
    app.get("/api/users/profile", getSignedInUserProfile);
    app.post("/api/users/logout", logout);
}