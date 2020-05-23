import UserModel from '../models/UserModel'

const requireAuth = async(req, res, next) => {
    // console.log(req.cookies.user_name)
    var token = req.signedCookies.token
    var user_name = req.signedCookies.username
    if (!token) {
        res.redirect('/admin/login');
        return;
    }
    try {
        let tokens = await UserModel.findAll({
            where: {
                token,
                user_name
            }
        })
        if (tokens.length < 0) {
            res.redirect('/admin/login');
            return;
        }
    } catch (error) {
        // console.log(error)
        res.redirect('/admin/login');
        return
    }
    next();
}

export default {
    requireAuth: requireAuth
}