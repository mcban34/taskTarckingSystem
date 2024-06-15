const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey : true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

    });

    Employee.beforeCreate(async (employee, options) => {
        employee.password = await bcrypt.hash(employee.password, 10);
    });

    Employee.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    return Employee;
};