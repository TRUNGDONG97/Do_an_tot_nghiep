import express from 'express'
import AuthController from '../Controllers/AuthController'
const router = express.Router();

router.get('/', AuthController.logout);
// router.post('/', AuthController.postLogin);
module.exports = router;