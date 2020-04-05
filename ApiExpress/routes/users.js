import express from 'express' 
var router = express.Router();

 

/* GET login listing. */
router.get('/login', function (req, res, next) {
    console.log(req.body.password)
    if (req.body.username != null && req.body.password != null) {
        if (req.body.username === 'android003' && req.body.password === '123456'){
            var result = {
                status : 0,
                msg: 'Thành Công',
                data :{
                    username: req.body.username,
                    userId : 1,
                    profile_picture : 'https://cdn-images.kiotviet.vn/hienkhangkiet/19c30855eb8b42258e6d58547a1e7b80.jpg'
                }
            }
            res.json(result);
        } else{
            var result = {
                status : 0,
                msg: 'Sai tài khoản hoặc mật khẩu đăng nhập',
                data :{}
            }
            res.json(result);
        }
    }else{
        var result = {
            status : 0,
            msg: 'Vui lòng kiểm tra lại thông tin đăng nhập',
            data :{}
        }
        res.json(result);
    }
});




export default router;
