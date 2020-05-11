$(document).ready(function () {
    $('#tabClass a').css({ "background-color": "#17a2b8", "color": "#fff" })
    getClass(1)
    $('#btnSearchClass').click(function () {
        searchClass(1)
        // alert('đá')
    })
});
function getClass(currentPage) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    $.ajax({
        url: '/getClass',
        type: 'POST',
        data: { currentPage },
        cache: false,
        timeout: 50000,
    }).done(function (res) {
        $('#tableClass').html(res.htmlTable)
        // $('#paginateActive').css({ "background-color": "#17a2b8", "color": "#fff" })
        return
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        swal({
            title: "Đã có lỗi xảy ra",
            text: "",
            icon: "warning",
            dangerMode: true,
        })
        // console.log(textStatus + ': ' + errorThrown);
        return;
    })
}
function searchClass(currentPage) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var subName = $.trim($("#txtSearchSubjectName").val());
    var teacName = $.trim($("#txtSearchTeacherName").val());
    var subCode = $.trim($("#txtSearchSubjectCode").val());
    var claCode = $.trim($("#txtSearchClassCode").val());
    var roomName = $.trim($("#txtSearchRoomName").val());
    if (subCode == "" && subName == "" || teacName == '' || claCode == '' || roomName == '') {
        return;
    }
    // $.ajax({
    //     url: '/class/search',
    //     type: 'POST',
    //     data: {
    //        subName,
    //        subCode,
    //        teacName,
    //        claCode,
    //        roomName
    //     },
    //     // dataType: "json",
    //     cache: false,
    //     timeout: 50000,
    // }).done(function (res) {
    //     // console.log(res.htmlTable)
    //     $('#tableStudent').html(res.htmlTable)
    //     return
    // }).fail(function (jqXHR, textStatus, errorThrown) {
    //     // If fail
    //     swal({
    //         title: "Đã có lỗi xảy ra",
    //         text: "",
    //         icon: "warning",
    //         dangerMode: true,
    //     })
    //     // console.log(textStatus + ': ' + errorThrown);
    //     return;
    // });
}