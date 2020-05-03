import express from 'express'
import AuthController from '../controllers/AuthController'
const router = express.Router();

router.get('/', AuthController.logout);
// router.post('/', AuthController.postLogin);
module.exports = router;