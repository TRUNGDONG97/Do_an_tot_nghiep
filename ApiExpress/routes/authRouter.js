import express from 'express'
import AuthController from '../Controllers/AuthController'
const router = express.Router();

router.get('/', AuthController.login);
router.post('/', AuthController.postLogin);
module.exports = router;