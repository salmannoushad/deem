const User = require('./user.model');

const checkIfUserExists = async function (mail) {
    try{
        const record = await User.findOne({ where: { email: mail }})
        return record;
    }
    catch(err) {
        console.log(err);
    }
}

async function signup (req,res) {
    try{
        const { username, email, password, confirmPassword } = req.body;

        const user = {
            username,
            email,
            password,
            confirmPassword
        }
        if (await checkIfUserExists(user.email)) {
            return res.status(200).send("User is already exists")
        }

        await User.create(user)
        res.status(201).send(user)

    }
    catch(err){
        console.log(err);
    }

}

async function getUsers (req,res) {
    try{
        const users = await User.findAll()
        res.send(users);
    }
    catch (error) {
        console.log(error);
    }
}

async function login (req,res) {
    try {
        const { email, password } = req.body;

        const userReq = {
            email,
            password
        }

        const dbUser = await User.findOne({ 
            where: {
                email: userReq.email,
                password: userReq.password
            }
        })

        if(!dbUser){
            return res.status(404).send("Invalid Credentials")
        }

        res.send(dbUser)
    }
    catch (err) {
        console.log(err);
    }
}

const update = async function(req,res) {
    try {
        const { id } = req.params;
        const { password } = req.body; 

        const record = await User.findOne(
            {
                where: { id: id}
            }
        )

        if ( !record ) {
            return res.status(404).send("User not found")
        }
        
        await User.update({ password: password }, { where: { id:id }})
        res.status(201).send(record)

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal server error")
    }
}



module.exports.signup = signup;
module.exports.getUsers = getUsers;
module.exports.login = login; 
module.exports.update = update; 
