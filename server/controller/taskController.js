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

        if(data) {
            return res.status(200).json({
                message : "Görev Silindi."
            });
        } else {
            return res.status(200).json({
                message : "Görev Silinemedi."
            });
        }
        

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

        if(data) {
            return res.status(200).json({
                message : "Görev Başarıyla Güncellendiiii."
            });
        } else {
            return res.status(200).json({
                message : "Görev Güncellenemedi."
            });
        }
        
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).send(error?.message || error);
    }
}


module.exports = taskController;
