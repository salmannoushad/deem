const Student = require('./student.model');


async function getStudents (req,res) {
    try{
        const students = await Student.findAll()
        res.send(students);
    }
    catch (error) {
        console.log(error);
    }

}

function createStudent (req,res) {
    const student = {
        roll: req.body.roll,
        name: req.body.name
    }

    Student.create(student)
   .then(student => {res.send(student)})
   .catch(err => console.log(err))


    res.send(student)
}

module.exports.getStudents = getStudents;
module.exports.createStudent = createStudent;