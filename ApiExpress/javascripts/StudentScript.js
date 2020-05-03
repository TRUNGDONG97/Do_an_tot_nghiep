$(document).ready(function () {
    $('#tabStudent a').css({ "background-color": "#17a2b8", "color": "#fff" })
    getStudent(1)
    $('#btnSearch').click(function () {
        searchStudent(1)
    })
    $('#txtAddBirthday').datepicker({
        weekStart: 1,
        daysOfWeekHighlighted: "6,0",
        autoclose: true,
        todayHighlight: true,
    });
    $('#txtAddBirthday').datepicker("setDate", new Date());
    $('#txtEditBirthday').datepicker({
        weekStart: 1,
        daysOfWeekHighlighted: "6,0",
        autoclose: true,
        todayHighlight: true,
    });
    $('#txtEditBirthday').datepicker();
});

function getStudent(currentPage) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    $.ajax({
        url: '/getStudent',
        type: 'POST',
        data: { currentPage },
        cache: false,
        timeout: 50000,
    }).done(function (res) {
        $('#tableStudent').html(res.htmlTable)
        $('#paginateActive').css({ "background-color": "#17a2b8", "color": "#fff" })
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

function searchStudent(currentPage) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var name = $.trim($("#txtName").val());
    var mssv = $.trim($("#txtMssv").val());
    if (name == "" && mssv == "") {
        return;
    }
    checkedMssv(mssv)
    $.ajax({
        url: '/student/search',
        type: 'POST',
        data: {
            name,
            mssv,
            currentPage
        },
        // dataType: "json",
        cache: false,
        timeout: 50000,
    }).done(function (res) {
        // console.log(res.htmlTable)
        $('#tableStudent').html(res.htmlTable)
        $('#paginateActive').css({ "background-color": "#17a2b8", "color": "#fff" })
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
    });


}

function deleteStudent(id) {
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
                    url: '/student/delete',
                    type: 'POST',
                    data: {
                        id
                    },
                    cache: false,
                    timeout: 50000,
                }).done(function (res) {
                    // console.log(res.result)
                    if (res.result == 1) {
                        swal({
                            title: "",
                            text: "Xóa thành công!",
                            icon: "success"
                        });
                        getStudent(1)
                    } else {
                        swal({
                            title: "",
                            text: "Không tồn tại sinh viên này",
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

function addStudent() {
    // alert('hello')
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var name = $.trim($("#txtAddName").val());
    var mssv = $.trim($("#txtAddMssv").val());
    var phone = $.trim($("#txtAddPhone").val());
    var birthday = $.trim($("#txtAddBirthday").val());
    var address = $.trim($("#txtAddAddress").val());
    var email = $.trim($("#txtAddEmail").val());
    var sex = $('#addSexFemale').prop('checked')
    if (name == '' || mssv == '' || phone == '' || birthday == '' || address == '') {
        swal({
            title: "Chưa nhập đầy đủ thông tin",
            text: "",
            icon: "warning"
        })
        return;
    }
    checkedMssv(mssv)
    checkedPhone(phone)
    checkedMail(email)
    $.ajax({
        url: '/student/add',
        type: 'POST',
        data: {
            name,
            phone,
            mssv,
            birthday,
            address,
            email,
            sex: sex ? 0 : 1
        },
        cache: false,
        timeout: 50000,
    }).done(function (res) {
        // console.log(res.result)
        if (res.result == 0) {
            $("#txtAddMssv").val("");
            swal({
                title: "Mã số sinh viên đã tồn tại",
                text: "",
                icon: "warning"
            })
            return;
        }
        if (res.result == 1) {
            $("#txtAddPhone").val("");
            swal({
                title: "Số điện thoại đã tồn tại",
                text: "",
                icon: "warning"
            })
            return;
        }
        if (res.result == 2) {
            $("#txtAddEmail").val("");
            swal({
                title: "Email đã tồn tại",
                text: "",
                icon: "warning"
            })
            return;
        }
        $("#addStudentModal").modal("hide");
        $("#txtAddName").val("");
        $("#txtAddPhone").val("");
        $("#txtAddMssv").val("");
        $("#txtAddAddress").val("");
        $("#txtAddEmail").val("");
        swal({
            title: "Thêm thành công",
            text: "",
            icon: "success"
        })
        getStudent(1)
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
    })
}

function editStudent(id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    $.ajax({
        url: '/student/edit',
        data: { id },
        type: 'POST',
        cache: false,
        timeout: 50000
    }).done(function (res) {
        // console.log(res)
        if (res.result == 0) {
            swal({
                title: "",
                text: "Không tồn tại sinh viên này",
                icon: "warning"
            });
        } else {
            $('#divModalEditStudent').html(res.htmlModalEditStudent)
            $('#EditStudentModal').modal('show');
        }
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
    })
}
function saveStudent(id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var name = $.trim($("#txtEditName").val());
    var mssv = $.trim($("#txtEditMssv").val());
    var phone = $.trim($("#txtEditPhone").val());
    var birthday = $.trim($("#txtEditBirthday").val());
    var address = $.trim($("#txtEditAddress").val());
    var email = $.trim($("#txtEditEmail").val());
    var sex = $('#editSexFemale').prop('checked')
    if (name == '' || mssv == '' || phone == '' || birthday == '' || address == '') {
        swal({
            title: "Chưa nhập đầy đủ thông tin",
            text: "",
            icon: "warning"
        })
        return;
    }
    checkedMssv(mssv)
    checkedPhone(phone)
    checkedMail(email)
    $.ajax({
        url: '/student/save',
        data: {
            id,
            name,
            phone,
            mssv,
            birthday,
            address,
            email,
            sex: sex ? 0 : 1
        },
        type: 'POST',
        cache: false,
        timeout: 50000
    }).done(function (res) {
        // console.log(res.result)
        if (res.result == 0) {
            swal({
                title: "Mã số sinh viên đã tồn tại",
                text: "",
                icon: "warning"
            })
            return;
        }
        if (res.result == 1) {
            swal({
                title: "Số điện thoại đã tồn tại",
                text: "",
                icon: "warning"
            })
            return;
        }
        if (res.result == 2) {
            swal({
                title: "Email đã tồn tại",
                text: "",
                icon: "warning"
            })
            return;
        }
        $("#EditStudentModal").modal("hide");
        $("#txtEditName").val("");
        $("#txtEditPhone").val("");
        $("#txtEditMssv").val("");
        $("#txtEditAddress").val("");
        $("#txtEditEmail").val("");
        swal({
            title: "Sửa thành công",
            text: "",
            icon: "success"
        })
        getStudent(1)
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
    })
}
function resetPass(id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    $.ajax({
        url: '/student/resetPass',
        data: { id },
        type: 'POST',
        cache: false,
        timeout: 50000
    }).done(function (res) {
        // console.log(res)
        if (res.result == 0) {
            swal({
                title: "",
                text: "Không tồn tại sinh viên này",
                icon: "warning"
            });
        } else {
            swal({
                title: "Cài lại mật khẩu thành công",
                text: "",
                icon: "success"
            })
        }
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
    })
}

function checkedMail(email) {
    var email_regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!email_regex.test(email)) {
        swal({
            title: "Email không hợp lệ",
            text: "",
            icon: "warning"
        })
        return;
    }
}
function checkedPhone(phone) {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (!vnf_regex.test(phone)) {
        swal({
            title: "Số điện thoại không hợp lệ ",
            text: "",
            icon: "warning"
        })
        return;
    }
}
function checkedMssv(mssv) {
    var mssv_regex = /^[0-9]*$/;
    if (!mssv_regex.test(mssv)) {
        swal({
            title: "Mã số sinh viên không hợp lệ",
            text: "",
            icon: "warning"
        })
        return;
    }
}