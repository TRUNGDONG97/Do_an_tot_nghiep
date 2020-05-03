import UserModel from '../models/UserModel'
// import { isNumeric, isEmty } from 'validator'
const home = async(req, res, next) => {
    res.render('HomeView');

}
export default {
     home
}