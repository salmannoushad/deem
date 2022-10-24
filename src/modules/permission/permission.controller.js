const Permission = require('./permission.model');

const createPermission = async (req,res) => {

    try{
        const { name, services } = req.body;
    
        const permission = await Permission.create({ name, services })
    
        res.status(200).send(permission)
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal Server Error")
    }

}

module.exports.createPermission = createPermission 