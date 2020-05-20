$(document).ready(function() {
    $('#tabSubject a').css({ "background-color": "#17a2b8", "color": "#fff" })
    getSubject(1)
    $('#btnSearchSubject').click(function() {
        searchSubject(1)
    })

});

function getSubject(currentPage) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    $.ajax({
        url: '/getSubject',
        type: 'POST',
        data: { currentPage },
        cache: false,
        timeout: 50000,
    }).done(function(res) {
        $('#tableSubject').html(res.htmlTable)
        return
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // If fail
        swal({
            title: "Đã có lỗi xảy ra",
            text: "",
            icon: "warning",
            dangerMode: true,
        })
        console.log(textStatus + ': ' + errorThrown);
        return;
    })
}

function searchSubject(currentPage) {
    // alert(currentPage)
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var subject_name = $.trim($("#txtSubjectName").val());
    var subject_code = $.trim($("#txtSubjectCode").val());
    if (subject_name == "" && subject_code == "") {
        getSubject(1)
        return;
    }
    // checkedPhone(phone)
    $.ajax({
        url: '/subject/search',
        type: 'POST',
        data: {
            subject_name,
            subject_code,
            currentPage
        },
        // dataType: "json",
        cache: false,
        timeout: 50000,
    }).done(function(res) {
        $('#tableSubject').html(res.htmlTable)
        return
    }).fail(function(jqXHR, textStatus, errorThrown) {
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

function addSubject() {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var subject_name = $.trim($("#txtAddSubjectName").val());
    var subject_code = $.trim($("#txtAddSubjectCode").val());
    var time = $.trim($("#txtTime").val());
    var credit_hour = $.trim($("#txtCreditHour").val());
    var coefficient = $.trim($("#txtcoefficient").val());
    if (subject_name == '' || subject_code == '' || time == '' || credit_hour == '' || coefficient == '') {
        swal({
            title: "Chưa nhập đầy đủ thông tin",
            text: "",
            icon: "warning"
        })
        return;
    }

    $.ajax({
        url: "/subject/add",
        type: 'POST',
        data: {
            subject_name,
            subject_code,
            time,
            credit_hour,
            coefficient
        },
        cache: false,
        timeout: 50000,
    }).done(function(res) {
        console.log(res.result)
        if (res.result == 0) {
            $("#txtSubjectCode").val("");
            swal({
                title: "Mã học phần đã tồn tại",
                text: "",
                icon: "warning"
            })
            return;
        }
        $("#AddSubjectModal").modal("hide");
        $("#txtAddSubjectName").val("");
        $("#txtAddSubjectCode").val("");
        $("#txtTime").val("");
        $("#txtCreditHour").val("");
        $("#txtcoefficient").val("");
        swal({
            title: "Thêm thành công",
            text: "",
            icon: "success"
        })
        getSubject(1)
        return;
    }).fail(function(jqXHR, textStatus, errorThrown) {
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

function deleteSubject(id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
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
                    url: '/subject/delete',
                    type: 'POST',
                    data: {
                        id
                    },
                    cache: false,
                    timeout: 50000,
                }).done(function(res) {
                    // console.log(res.result)
                    if (res.result == 1) {
                        swal({
                            title: "Xóa thành công!",
                            text: "",
                            icon: "success"
                        });
                        getSubject(1)
                    } else {
                        swal({
                            title: "Không tồn tại môn  này",
                            text: "",
                            icon: "warning"
                        });
                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
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

function editSubject(id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    // alert(typeof id)
    $.ajax({
        url: '/subject/edit',
        data: { id },
        type: 'POST',
        cache: false,
        timeout: 50000
    }).done(function(res) {

        $('#divModalEditSubject').html(res.htmlModalEdit)
        $('#editSubjectModal').modal('show');
        return;
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // If fail
        swal({
            title: "Đã có lỗi xảy ra",
            text: "",
            icon: "warning",
            dangerMode: true,
        })
        console.log(textStatus + ': ' + errorThrown);
        return;
    })
}



function saveSubject(id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var subject_name = $.trim($("#txtEditSubjectName").val());
    var subject_code = $.trim($("#txtEditSubjectCode").val());
    var time = $.trim($("#txtEditTime").val());
    var credit_hour = $.trim($("#txtEditCreditHour").val());
    var coefficient = $.trim($("#txtEditCoefficient").val());
    if (subject_name == '' || subject_code == '' || time == '' || credit_hour == '' || coefficient == '') {
        swal({
            title: "Chưa nhập đầy đủ thông tin",
            text: "",
            icon: "warning"
        })
        return;
    }
    // console.log(id)
    $.ajax({
        url: "/subject/save",
        type: 'POST',
        data: {
            id,
            subject_name,
            subject_code,
            time,
            credit_hour,
            coefficient
        },
        cache: false,
        timeout: 50000,
    }).done(function(res) {
        // console.log(res.result)

        if (res.result == 0) {
            swal({
                title: "Mã môn học đã tồn tại",
                text: "",
                icon: "warning"
            })

            return;
        }

        $("#editSubjectModal").modal("hide");
        swal({
            title: "Cập nhật thành công",
            text: "",
            icon: "success"
        })
        getSubject(1)
        return;
    }).fail(function(jqXHR, textStatus, errorThrown) {
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

// function checkedMail(email) {
//     var email_regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//     if (!email_regex.test(email)) {
//         swal({
//             title: "Email không hợp lệ",
//             text: "",
//             icon: "warning"
//         })
//         return;
//     }
// }

// function checkedPhone(phone) {
//     var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
//     if (!vnf_regex.test(phone)) {
//         swal({
//             title: "Số điện thoại không hợp lệ ",
//             text: "",
//             icon: "warning"
//         })
//         return;
//     }
// }

// function uploadImage(fileData) {
//     $.ajax({
//         url: "/uploadAvatar",
//         type: 'POST',
//         data: fileData,
//         contentType: false, // Not to set any content header  
//         processData: false, // Not to process data  
//         cache: false,
//         enctype: 'multipart/form-data'
//     }).done(function(res) {
//         if (res.result == 0) {
//             swal({
//                 title: "Không thể upload ảnh",
//                 text: "",
//                 icon: "warning",
//                 dangerMode: true,
//             })
//         }
//     }).fail(function(jqXHR, textStatus, errorThrown) {
//         // If fail
//         swal({
//                 title: "Đã có lỗi xảy ra",
//                 text: "",
//                 icon: "warning",
//                 dangerMode: true,
//             })
//             // console.log(textStatus + ': ' + errorThrown.message);
//             // console.log(jqXHR);
//     })
// }