import express from 'express'
import AuthController from '../controllers/AuthController'
const router = express.Router();

router.get('/login', AuthController.login);
router.post('/login', AuthController.postLogin);
router.get('/logout', AuthController.logout);
module.exports = router;