import UserModel from '../Models/UserModel'

const requireAuth = async(req, res, next) => {
    // console.log(req.cookies.user_name)
    var token = req.signedCookies.token
    var user_name = req.signedCookies.user_name
    if (!token) {
        res.redirect('login');
        return;
    }
    try {
        let tokens = await UserModel.findAll({
            attribute: ["token"],
            where: {
                token,
                user_name
            }
        })
        if (tokens.length < 0) {
            res.redirect('login');
            return;
        }
    } catch (error) {
        res.redirect('login');
        return
    }
    next();
}

export default {
    requireAuth: requireAuth
}