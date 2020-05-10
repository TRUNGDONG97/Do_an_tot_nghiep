import UserModel from '../models/UserModel'

const requireAuth = async(req, res, next) => {
    // console.log(req.cookies.user_name)
    var token = req.signedCookies.token
    var password = req.signedCookies.password
    if (!token) {
        res.redirect('/admin/login');
        return;
    }
    try {
        let tokens = await UserModel.findAll({
            attribute: ["token"],
            where: {
                token,
                password
            }
        })
        if (tokens.length < 0) {
            res.redirect('/admin/login');
            return;
        }
    } catch (error) {
        res.redirect('/admin/login');
        return
    }
    next();
}

export default {
    requireAuth: requireAuth
}