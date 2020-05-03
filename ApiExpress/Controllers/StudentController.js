import StudentModel from '../models/StudentModel'
import Constants from '../constants/Constants'
import {getArrayPages} from '../constants/Funtions'
import url from 'url'
const getStudent = async (req, res, next) => {
    res.render('StudentView');
}
export default {
    getStudent
}