const express = require("express");;
const userRouter= require("../modules/user/user.route");

module.exports = function(){
    const app = express()
    app.use(express.json())
    userRouter(app)
    
    return app;
}