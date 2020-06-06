$(document).ready(function () {
    //    const url =window.location.search;
    //    const urlParams = new URLSearchParams(url);
    //    alert(urlParams.get('id'))
    $('#tabClass a').css({ "background-color": "#17a2b8", "color": "#fff" })
});
function addStudentInclass(class_id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var mssv = $.trim($("#txtMssvStudent").val());
    if (mssv == '') {
        swal({
            title: "Chưa nhập mã số sinh viên",
            text: "",
            icon: "warning"
        })
        return;
    }
    $.ajax({
        url: '/class/addStuInclass',
        type: 'POST',
        data: {
            class_id,
            mssv
        },
        // dataType: "json",
        cache: false,
        timeout: 50000,
    }).done(function (res) {
        // console.log(res.result)
        if (res.result == 0) {
            swal({
                title: "Không tồn tại sinh viên này",
                text: "",
                icon: "warning"
            })
            return;
        }
        if (res.result == 1) {
            swal({
                title: "Sinh viên đã có trong danh sách",
                text: "",
                icon: "warning"
            })
            return;
        }
        swal({
            title: "Sinh viên đã được thêm vào danh sách",
            text: "",
            icon: "success"
        })
        // console.log(res.htmlTable, 'htmlTable')
        $('#tableDetailClass').html(res.htmlTable)
        return;
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
    });
}

function searchStudentInclass(class_id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var mssv = $.trim($("#txtMssvStudent").val());
    var name = $.trim($("#txtNameStudent").val());
    if (mssv == '' && name == '') {
        return;
    }
    $.ajax({
        url: '/class/searchStuInclass',
        type: 'POST',
        data: {
            class_id,
            mssv,
            name
        },
        // dataType: "json",
        cache: false,
        timeout: 50000,
    }).done(function (res) {
        $('#tableDetailClass').html(res.htmlTable)
        return;
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
    });
}
function deleteStuInClass(student_id, class_id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    console.log(student_id, class_id)
    swal({
        title: "Bạn chắc chắn xóa chứ?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true
    })
        .then((isConFirm) => {
            if (isConFirm) {
                $.ajax({
                    url: '/class/deleteStuInclass',
                    type: 'POST',
                    data: {
                        student_id, class_id
                    },
                    cache: false,
                    timeout: 50000,
                }).done(function (res) {
                    // console.log(res.result)
                    if (res.result == 1) {
                        swal({
                            title: "Xóa thành công!",
                            text: "",
                            icon: "success"
                        });
                        $('#tableDetailClass').html(res.htmlTable)
                    } else {
                        swal({
                            title: "Lớp không có sinh viên này",
                            text: "",
                            icon: "warning"
                        });
                    }
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
        });
}

function checkedPhone(phone) {
    var vnf_regex = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g;
    if (!vnf_regex.test(phone)) {
        swal({
            title: "Số điện thoại không hợp lệ ",
            text: "",
            icon: "warning"
        })
        return;
    }
}