const ajaxGetStudent=$.ajax({
    url: '/getStudent',
        type: 'GET',
        dataType: "json",
        cache: false,
        timeout: 50000,
})
const ajaxGetClass=$.ajax({
    url: '/getClass',
        type: 'GET',
        dataType: "json",
        cache: false,
        timeout: 50000,
})
const ajaxGetTeacher=$.ajax({
    url: '/getTeacher',
        type: 'GET',
        dataType: "json",
        cache: false,
        timeout: 50000,
})

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
    $.when(ajaxGetStudent,ajaxGetTeacher,ajaxGetClass).done(function(resStudent,resTeacher,resClass) {
        $('#student-selection span').append(resStudent[0].students.length)
        $('#teacher-selection span').append(resTeacher[0].teachers.length)
        $('#class-selection span').append(resClass[0].classes.length)
    })
   
});