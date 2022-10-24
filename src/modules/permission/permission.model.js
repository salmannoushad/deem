const path = require("path");
const sequelize = require(path.join(process.cwd(), '/src/config/lib/sequelize'));
const { DataTypes } = require("sequelize");

const Permission = sequelize.define("permissions", {
    id:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4

    },
    name:{
        type: DataTypes.STRING
    },
    services:{
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
}, {
    tableName: "permissions",
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: "updated_at"
})

module.exports = Permission;