import Constants from './Constants'
import request from 'request'
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
module.exports.pushNotificationAppStudent=(device, message,data)=>{
    var restKey = 'OTllOWM0ODYtMDhmMC00MjkxLTkxN2MtODNmNjkzN2YyYjBi';
	var appID = 'a3a7b8e7-3607-4ed1-9066-3a8e98e9ce86';
	request(
		{
			method:'POST',
			uri:'https://onesignal.com/api/v1/notifications',
			headers: {
				"authorization": "Basic "+restKey,
				"content-type": "application/json"
			},
			json: true,
			body:{
				'app_id': appID,
				'contents': {en: message},
                'include_player_ids': Array.isArray(device) ? device : [device],
                'data': data,
                'headings':{en: 'Notification'}
			}
		},
		function(error, response, body) {
			if(!body.errors){
				console.log(body);
			}else{
				console.error('Error:', body.errors);
			}
			
		}
	);
}
module.exports.pushNotificationAppTeacher=(device, message,data)=>{
    var restKey = 'YWM2NzIwOTMtMzc1ZC00MTY5LWIwZGUtNTUyYjUwYmI0OThi';
	var appID = 'b820e2f8-d15f-4c53-97eb-26716bab1b46';
	request(
		{
			method:'POST',
			uri:'https://onesignal.com/api/v1/notifications',
			headers: {
				"authorization": "Basic "+restKey,
				"content-type": "application/json"
			},
			json: true,
			body:{
				'app_id': appID,
				'contents': {en: message},
                'include_player_ids': Array.isArray(device) ? device : [device],
                'data': data,
                'headings':{en: 'Notification'}
			}
		},
		function(error, response, body) {
			if(!body.errors){
				console.log(body);
			}else{
				console.error('Error:', body.errors);
			}
			
		}
	);
}