var express = require('express');
var router = express.Router();
var employeeController = require('../controller/employeeController')
const verify = require('../config/verifyToken')


router.get('/', verify , employeeController.getAllEmployee);
router.post('/', verify, employeeController.createEmployee);
router.delete('/', verify, employeeController.deleteEmployee);
router.put('/', verify, employeeController.updateEmployee);

router.post('/login', employeeController.login);


module.exports = router;
