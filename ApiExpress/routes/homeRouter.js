import express from 'express'
import HomeController from '../Controllers/HomeController'
const router = express.Router();
/* GET home page. */

router.get('/', HomeController.Home);
module.exports = router;