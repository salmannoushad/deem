const path = require("path");

function init() {
    const sequelize = require(path.join(process.cwd(), "/src/config/sequelize.js"))

    sequelize.query('CREATE DATABASE IF NOT EXISTS blog')
    .then(() => {
        console.log('Successfull');
    })
    .catch((error) => {
        console.log(error);
    })

    const user = require(path.join(process.cwd(), '/src/modules/user/user.model.js'))
    const student = require(path.join(process.cwd(), '/src/modules/student/student.model.js'))
    
    sequelize.sync()
    .then(() => console.log("success"))
    .catch((err) => console.log(err))
}

init()