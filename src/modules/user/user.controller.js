const User = require('./user.model');
const { generateAccessToken } = require('./user.service')

async function signUp (req, res, next) {
    try{
        const { username, email, password } = req.body;
        
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { username, email, password }
        })

        if (!created) {
            return res.status(409).send("User already exists")
        }
        res.status(201).send(user);                      
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    }

};

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

        const userObj = {
            email,
            password
        };

        const user  = await User.findOne({
            where: {
                email: userObj.email,
                password: userObj.password,
            }
        });

        if(!user) {
            return res.status(400).send('Invalid credentials.');
        }       

        res.cookie("access_token", generateAccessToken(user), {
            httpOnly: true,
            signed: true
        })

        res.status(200).json(user)
    } catch(err) {
        res.status(500).send("Internal server error."); 
    }
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

    try{
        const id = req.user.id;

        const user = await User.findOne({
            where: { id: id }
        });

        if(!user) {
           return res.status(404).send("User not found.");
        }

        res.status(200).json(user);
    } catch(err) {
        res.status(500).send('Internal server error');
    }
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
