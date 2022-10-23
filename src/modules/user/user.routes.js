const { getUsers, signUp, login, update, getSignedInUserProfile, logout} = require('./user.controller')
const validate = require('../core/middlewares/validator.middleware');
const { registerSchema, loginSchema } = require('./user.schema');
const UserStrategy = require('./user.authentication.middleware');

module.exports = function (app) {    
    app.get("/users", getUsers)
    app.post("/api/users/signup", validate(registerSchema) ,signUp)
    app.post("/api/users/login", validate(loginSchema),login);
    app.put("/api/users/update/:id", update);
    app.get("/api/users/profile", UserStrategy, getSignedInUserProfile);
    app.post("/api/users/logout", logout);
}