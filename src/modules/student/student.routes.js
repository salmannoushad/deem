const { getStudents, createStudent } = require('./student.controller')

module.exports = function (app) {    
    app.get("/students", getStudents)
    app.post("/students", createStudent)
}