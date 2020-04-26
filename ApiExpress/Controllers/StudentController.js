import StudentModel from '../Models/StudentModel'
// import paginate from 'express-paginate'
import Constants from '../constants/Constants'
import {getArrayPages} from '../constants/funtions'
import url from 'url'
const getStudent = async (req, res, next) => {
    // console.log(Constants.PER_PAGE)
    // const pathname = url.parse(req.originalUrl).pathname
    // try {
    //     const page = await parseInt(req.query.page ? req.query.page : 1)
    //     const count = await StudentModel.count()
    //     const pageCount = count % Constants.PER_PAGE == 0 ? Math.floor(count / Constants.PER_PAGE) : Math.floor(count / Constants.PER_PAGE) + 1
    //     // console.log(p)
    //     const currentPage = page > pageCount ? pageCount : page
    //     const students = await StudentModel.findAll({ offset: Constants.PER_PAGE * (currentPage - 1), limit: Constants.PER_PAGE })
    //     // console.log(currentPage)
    //     //  số trang
    //     // console.log(getArrayPages(req)(pageCount,currentPage))
    //     // console.log( url.parse(req.originalUrl).pathname)
    //     // console.log( url.parse(req.originalUrl).hostname)
    //     res.render('listStudent');
    //     return;
    // } catch (error) {
    //     console.log(error)
    //     res.render('error', {
    //         error: error
    //     })
    //     return;
    // }
    res.render('listStudent');

}
export default {
    getStudent
}