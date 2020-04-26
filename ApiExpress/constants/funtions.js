import qs from 'qs'
import url from 'url'
// import assign from 'lodash.assign'
// import clone from 'lodash.clone'
// import isObject from 'lodash.isobject'

// function getParameterByName(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// }


module.exports.getArrayPages = function (req) {
    return function (pageCount,currentPage) {
        // const pathname = url.parse(req.originalUrl).pathname
        var pages = [];
        for (var i = 1; i <= pageCount; i++) {
            pages.push(i)
        }
        const prev=parseInt( currentPage)-1
        const next=parseInt( currentPage)+1
        return {
            prev:prev,
            next:next,
            pages:pages
        }
    }
}
