const db = require("../models");
const jwt = require('jsonwebtoken');
let employeeController = {}

employeeController.getAllEmployee = async (req, res) => {
    try {

        const tasks = await db.Employee.findAll({
            raw: true
        });

        return res.json(tasks);

    } catch (error) {
        console.log("ERROR", error);
    }
}

employeeController.createEmployee = async (req, res) => {
    try {

        const data = await db.Employee.create(req.body, {
            raw: true
        });

        return res.status(200).json(data);

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).send(error?.message || error);
    }
}

employeeController.deleteEmployee = async (req, res) => {
    try {

        const {
            employeeId
        } = req.query

        const data = await db.Employee.destroy({
            where: {
                id: employeeId
            }
        });

        return res.status(200).json(data);

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).send(error?.message || error);
    }
}

employeeController.updateEmployee = async (req, res) => {
    try {

        const data = await db.Employee.update(req.body.body, req.body.where, {
            raw: true
        });

        return res.status(200).json(data);

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).send(error?.message || error);
    }
}

employeeController.login = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;

        const user = await db.Employee.findOne({
            where: {
                email
            }
        });
        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }

        const token = jwt.sign({
            id: user.id
        }, "secretKey", {
            expiresIn: '1h'
        });
        res.json({
            token
        });

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).send(error?.message || error);
    }
}

module.exports = employeeController;