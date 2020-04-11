import UserModel from '../Models/UserModel'
// import { isNumeric, isEmty } from 'validator'
const Home = async(req, res, next) => {
    res.render('home', {
        test: "hello"
    });

}
export default {
    Home: Home
}