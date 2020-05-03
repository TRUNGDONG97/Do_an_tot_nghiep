import express from 'express'
import AuthController from '../controllers/AuthController'
const router = express.Router();

router.get('/', AuthController.login);
router.post('/', AuthController.postLogin);
module.exports = router;