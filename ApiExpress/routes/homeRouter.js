import express from 'express'
import HomeController from '../controllers/HomeController'
const router = express.Router();
/* GET home page. */

router.get('/index', HomeController.home);
module.exports = router;