import UserModel from '../Models/UserModel'
import { isNumeric, isEmpty } from 'validator'
import md5 from 'md5'
import Constants from '../constants/Constants'
const login = async (req, res, next) => {
    res.render('login')
}
const logout = async (req, res, next) => {
    res.cookie('token', "")
    res.cookie('password', "")
    res.cookie('username', "")
    res.redirect('login')
}
const postLogin = async (req, res, next) => {
    // console.log(req.body)
    var user_name = req.body.username
    var password = md5(req.body.password)
    // console.log(md5('admin'))
    // console.log(req.body.password)
    // console.log(password)
    // console.log(user_name)
    // var hashPass = md5(123456)
    // console.log(hashPass)
    if (isEmpty(user_name)) {
        res.render('login', {
            error: 'Bạn chưa nhập tên đăng nhập',
            value: req.body
        })
        return;
    }
    if (isEmpty(password)) {
        res.render('login', {
            error: 'Bạn chưa nhập mật khẩu',
            values: req.body
        })
        return;
    }
    try {

        const user = await UserModel.findAll({
            attribute: ["id", "user_name", "password", "email", "name", "token"],
            where: {
                user_name,
                password
            }
        })
       
        // console.log(isEmpty(password))
        if (user.length > 0) {
            // console.log()

            res.cookie('token', user[0].token, Constants.OPTION)
            res.cookie('password', user[0].password, Constants.OPTION)
            res.cookie('username', user[0].user_name, Constants.OPTION)
            res.redirect('home/index')
            return
        } else {
            // console.log("tk ko tồn tại")
            res.render('login', {
                error: 'Bạn nhập sai tài khoản hoặc mật khẩu',
                values: req.body
            })
            return;
        }
    } catch (error) {
        console.log(error, "error")
        // res.json({
        //     result: 'that bai',
        //     data: {},
        //     error: error
        // })
        res.render('error')
        return;
    }
}

export default {
    login,
    logout,
    postLogin

}