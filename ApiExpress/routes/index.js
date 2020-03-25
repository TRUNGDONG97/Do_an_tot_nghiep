var express = require('express');
var router = express.Router();
var testControlller=require('../public/Controllers/testController')
/* GET home page. */
router.route('/').get(testControlller.test) 

module.exports = router;
