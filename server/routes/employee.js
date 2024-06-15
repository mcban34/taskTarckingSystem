var express = require('express');
var router = express.Router();
var employeeController = require('../controller/employeeController')
const verify = require('../config/verifyToken')


router.get('/', verify , employeeController.getAllEmployee);
router.post('/', employeeController.createEmployee);
router.delete('/', employeeController.deleteEmployee);
router.put('/', employeeController.updateEmployee);

router.get('/login', employeeController.login);


module.exports = router;
