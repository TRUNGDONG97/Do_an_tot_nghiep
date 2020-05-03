// import {ajaxGetClass,ajaxGetTeacher,ajaxGetStudent} from '../constants/ajax'
const ajaxGetCountStudent=$.ajax({
    url: '/getCountStudent',
        type: 'GET',
        dataType: "json",
        cache: false,
        timeout: 50000,
})
const ajaxGetCountClass=$.ajax({
    url: '/getCountClass',
        type: 'GET',
        dataType: "json",
        cache: false,
        timeout: 50000,
})
const ajaxGetCountTeacher=$.ajax({
    url: '/getCountTeacher',
        type: 'GET',
        dataType: "json",
        cache: false,
        timeout: 50000,
})
// ajaxGetStudent.id=1
// ajaxGetTeacher.id=2
// ajaxGetClass.id=3
$(document).ready(function () {
    
    $('#tabHome a').css({
        "background-color": "#17a2b8",
        "color": "#fff"
    }),
    $('#student-selection').click(function() {
        window.location = '/student/index';
    })
    $('#teacher-selection').click(function() {
        window.location = '/teacher/index';
    })
    $('#class-selection').click(function() {
        window.location = '/class/index';
    })
    $.when(ajaxGetCountStudent,ajaxGetCountTeacher,ajaxGetCountClass).done(function(resStudent,resTeacher,resClass) {
        $('#student-selection span').append(resStudent[0].countStudent)
        $('#teacher-selection span').append(resTeacher[0].countTeacher)
        $('#class-selection span').append(resClass[0].countClass)
    }).fail(function(result){
        swal({
            title: "Đã có lỗi xảy ra",
            text: "",
            icon: "warning",
            dangerMode: true
        })
        console.log(result)
    })
});