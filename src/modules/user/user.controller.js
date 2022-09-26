const User = require('./user.model');


async function getUsers (req,res) {
    try{
        const users = await User.findAll()
        res.send(users);
    }
    catch (error) {
        console.log(error);
    }

}

function createUser (req,res) {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

   User.create(user)
   .then(user => {res.send(user)})
   .catch(err => console.log(err))


    res.send(user)
}

module.exports.getUsers = getUsers;
module.exports.createUser = createUser;