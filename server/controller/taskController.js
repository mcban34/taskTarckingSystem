const db = require("../models");
let taskController = {}

taskController.getAllTask = async (req, res) => {
    try {
        
        const tasks = await db.Task.findAll({raw : true});

        return res.json(tasks);

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).send(error?.message || error);
    }
}

taskController.createTask = async (req, res) => {
    try {
        
        const data = await db.Task.create( req.body ,{raw : true});

        return res.status(200).json(data);

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).send(error?.message || error);
    }
}

taskController.deleteTask = async (req, res) => {
    try {

        const {taskId} = req.query

        const data = await db.Task.destroy( {where : {id : taskId}});

        return res.status(200).json(data);

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).send(error?.message || error);
    }
}

taskController.updateTask = async (req, res) => {
    try {

        const data = await db.Task.update(
            req.body.body, 
            { where: req.body.where },
            { raw: true }
        );

        return res.status(200).json(data);

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).send(error?.message || error);
    }
}


module.exports = taskController;
