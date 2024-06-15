const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey : true,
            allowNull: false
        },
        taskDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE
        },
        finish_date: {
            type: DataTypes.DATE
        },
        employee_id: {
            type: DataTypes.UUID,
            references: {
                model: 'Employees', 
                key: 'id'
            }
        }

    });

    return Task;
};