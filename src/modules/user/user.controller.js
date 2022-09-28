const jwt = require('jsonwebtoken');
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

async function signUp (req,res) {
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

    const { email, password } = req.body;

    const user = {
        email,
        password
    };

    const promise = User.findOne({
        where: {
            email: user.email,
            password: user.password,
        }
    });

    function success(user) {
        if (user) {
        const access_token = jwt.sign(
            {
            id: user.id,
            }, 
            "jwt-secret", 
            {
            expiresIn: "1hr",
            issuer: user.id.toString()
            }
        )

        res.cookie("access_token", access_token, {
            httpOnly: true,
            signed: true
        })

        res.status(200).json(user)
        } else {
            res.status(404).send('User not found.')
        };
    };

    function error(err) {
        console.log(err);
        res.status(500).send("Internal Server error.");
    };

    promise
        .then(success)
        .catch(error)
};


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

const getSignedInUserProfile = async (req,res) => {
    const token = req.signedCookies['access_token'];

    if (!token) {
        res.status(400).send("Bad Request")
    };

    const payload = jwt.verify(token, 'jwt-secret');
    const { id } = payload;


    const promise =  User.findOne({
        where: { id: id }
    });

    function success(user) {
        if (user) {
            res.status(200).json(user)
        } 
    };

    function error(err) {
        console.log(err);
        res.status(500).send("Internal server error")
    };

    promise.then(success).catch(error);
}

const logout = (req,res) => {
    res.clearCookie("access_token");
    res.send("Logged out");

}



module.exports.getUsers = getUsers;
module.exports.signUp = signUp;
module.exports.login = login; 
module.exports.update = update; 
module.exports.getSignedInUserProfile = getSignedInUserProfile; 
module.exports.logout = logout; 
