export const ajaxGetStudent = () => {
    return $.ajax({
        url: '/getStudent',
        type: 'GET',
        dataType: "json",
        cache: false,
        timeout: 50000,
    })
}
export const ajaxGetClass = () => {
    return $.ajax({
        url: '/getClass',
        type: 'GET',
        dataType: "json",
        cache: false,
        timeout: 50000,
    })
}

export const ajaxGetTeacher = () => {
    $.ajax({
        url: '/getTeacher',
        type: 'GET',
        dataType: "json",
        cache: false,
        timeout: 50000,
    })
}
