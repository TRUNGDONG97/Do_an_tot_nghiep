import Constants from './Constants'

module.exports.getArrayPages = function (req) {
    return function (pageCount, currentPage) {
        const currP = parseInt(currentPage)
        const pageC = parseInt(pageCount)
        const pageSize = parseInt(Constants.PAGE_SIZE)
        const prev = currP - 1
        const next =currP + 1
        var pages = [];
        if (pageC <= pageSize) {
            for (var i = 1; i <= pageC; i++) {
                pages.push(i)
            }
            
        } else if (currP <= 2) {
            for (var i = 1; i <= pageSize; i++) {
                pages.push(i)
            }
          
        } else if (currP > pageC + 2 - pageSize) {
            for (var i = (pageC - pageSize+1); i <= pageC; i++) {
                pages.push(i)
            }
        } else {
            for (var i = (currP - 1); i <= currP+pageSize-2; i++) {
                pages.push(i)
            }
           
        }
        return {
            prev: prev,
            next: next,
            pages: pages,
        }
    }
}
module.exports.PageCount=function(count){
    return count % Constants.PER_PAGE == 0 ? Math.floor(count / Constants.PER_PAGE) : Math.floor(count / Constants.PER_PAGE) + 1
}