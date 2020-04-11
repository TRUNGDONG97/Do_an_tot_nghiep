import UserModel from '../Models/UserModel'
import { isNumeric, isEmpty } from 'validator'
import md5 from 'md5'
const login = async(req, res, next) => {
    res.render('login')
}
const postLogin = async(req, res, next) => {
    // console.log(req.body)
    var user_name = req.body.username
    var password = md5(req.body.password)
    console.log(md5('admin'))
        // console.log(user_name)
        // var hashPass = md5(123456)
        // console.log(hashPass)
    if (isEmpty(user_name)) {
        res.render('login', {
            error: 'Bạn chưa nhập tên đăng nhập',
            value: req.body
        })
    }
    if (isEmpty(password)) {
        res.render('login', {
            error: 'Bạn chưa nhập mật khẩu',
            values: req.body
        })
    }
    try {

        let user = await UserModel.findAll({
                attribute: ["id", "user_name", "password", "email", "name", "token"],
                where: {
                    user_name,
                    password
                }
            })
            // console.log(isEmpty(password))
        if (user.length > 0) {
            // console.log()
            let option = {
                maxAge: 1000 * 60 * 10, // would expire after 15 minutes
                httpOnly: true, // The cookie only accessible by the web server
                signed: true,
            }
            res.cookie('token', user[0].token, option)
            res.cookie('user_name', user[0].user_name, option)
            res.redirect('home')

        } else {
            console.log("tk ko tồn tại")
            res.render('login', {
                error: 'Bạn nhập sai tài khoản hoặc mật khẩu',
                values: req.body
            })
        }
    } catch (error) {
        console.log(error, "error")
            // res.json({
            //     result: 'that bai',
            //     data: {},
            //     error: error
            // })
        res.render('login', {
            error: "Not connect database",
            values: req.body
        })
    }
}

export default {
    login: login,
    postLogin: postLogin
}