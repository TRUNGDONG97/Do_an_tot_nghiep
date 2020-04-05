import UserModel from '../Models/UserModel'
// import { isNumeric, isEmty } from 'validator'
const Home = async(req, res, next) => {
    res.render('home', { title: 'Express' });

}
export default {
    Home: Home
}