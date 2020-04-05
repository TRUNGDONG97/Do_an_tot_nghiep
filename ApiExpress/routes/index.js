import express from 'express'


const router = express.Router();
/* GET home page. */
// router.post('/', testControlller.AddTeacher);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
