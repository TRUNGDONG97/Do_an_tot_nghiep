import express from 'express'
import ClassController from '../controllers/ClassController'
const router = express.Router();
/* GET home page. */

router.get('/index', ClassController.getClass);
module.exports = router;