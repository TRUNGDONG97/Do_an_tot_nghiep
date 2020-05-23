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
    var subCode = $.trim($("#txtSearchSubjectCode").val());
    var claCode = $.trim($("#txtSearchClassCode").val());
    var claStatus = $("#seachClassStatus").val()

    if (subCode == "" && subName == "" && claStatus == '' && claCode == '' && roomName == '') {
        getClass(1)
        return;
    }
    $.ajax({
        url: '/class/search',
        type: 'POST',
        data: {
            subCode,
            claStatus,
            claCode,
            currentPage
        },
        // dataType: "json",
        cache: false,
        timeout: 50000,
    }).done(function (res) {
        // console.log(res.result)
        $('#tableClass').html(res.htmlTable)
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

function addClass() {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }

    var claCode = $.trim($("#txtClassCode").val());
    var subCode = $.trim($("#txtSubjectCode").val());
    var teaPhone = $.trim($("#txtTeacherPhone").val());
    var room1 = $.trim($("#room1").val());
    var room2 = $.trim($("#room2").val());
    var day1 = $.trim($("#txtDay1").val());
    var day2 = $.trim($("#txtDay2").val());
    var timeStart1 = $.trim($("#timeStart1").val());
    var timeStart2 = $.trim($("#timeStart2").val());
    var timeEnd1 = $.trim($("#timeEnd1").val());
    var timeEnd2 = $.trim($("#timeEnd2").val());
    // console.log(claCode)
    // console.log(subCode)
    // console.log(teaPhone)
    // console.log(room)
    // console.log(day1)
    // console.log(timeStart1)
    // console.log(timeEnd1)
    // console.log(day2)
    // console.log(timeStart2)
    // console.log(timeEnd2)
    if (subCode == "" || claCode == '') {
        swal({
            title: "Chưa nhập đầy đủ thông tin",
            text: "",
            icon: "warning"
        })
        return;
    }
    if ((day1 == '' || timeStart1 == '' || timeEnd1 == '' || room1 == '') &&
        (day2 == '' || timeStart2 == '' || timeEnd2 == '' || room2 == '')) {
        swal({
            title: "Chưa nhập lịch học",
            text: "",
            icon: "warning"
        })
        return;
    }
    if (teaPhone != '') {
        checkedPhone(teaPhone)
    }
    $.ajax({
        url: '/class/add',
        type: 'POST',
        data: {
            subCode,
            claCode,
            teaPhone,
            room1,
            room2,
            day1,
            timeStart1,
            timeEnd1,
            day2,
            timeStart2,
            timeEnd2,
        },
        cache: false,
        timeout: 50000,
    }).done(function (res) {
        // console.log(res.result)
        if (res.result == 0) {
            swal({
                title: "Mã lớp đã có",
                text: "",
                icon: "warning",
            })
            return;
        }
        if (res.result == 1) {
            swal({
                title: "Không có giáo viên này",
                text: "",
                icon: "warning",
            })
            return;
        }
        if (res.result == 2) {
            swal({
                title: "Không có môn học này",
                text: "",
                icon: "warning",
            })
            return;
        }
        if (res.result == 5) {
            swal({
                title: "Không thể thêm lịch học cho lớp này",
                text: "",
                icon: "warning",
            })
            return;
        }
        if (res.result == 3) {
            swal({
                title: 'Thêm lịch học thành công cho lớp ' + res.class_code,
                text: "",
                icon: "warning",
            })

            $("#addClassModal").modal("hide");
            $("#txtClassCode").val("");
            $("#txtSubjectCode").val("");
            $("#txtTeacherPhone").val("");
            $("#txtAddAddress").val("");
            $("#room1").val("");
            $("#room2").val("");
            $("#txtDay1").val("");
            $("#txtDay2").val("");
            $("#timeStart1").val("");
            $("#timeStart2").val("");
            $("#timeEnd1").val("");
            $("#timeEnd2").val("");
            getClass(1)
            return;
        }
        swal({
            title: "Tạo lớp thành công",
            text: "",
            icon: "success",
        })
        $("#addClassModal").modal("hide");
        $("#txtClassCode").val("");
        $("#txtSubjectCode").val("");
        $("#txtTeacherPhone").val("");
        $("#txtAddAddress").val("");
        $("#room1").val("");
        $("#room2").val("");
        $("#txtDay1").val("");
        $("#txtDay2").val("");
        $("#timeStart1").val("");
        $("#timeStart2").val("");
        $("#timeEnd1").val("");
        $("#timeEnd2").val("");
        getClass(1)
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

function detailClass(class_code) {
    window.location.href = '/admin/class/detail?id=' + class_code;
}

function editClass(id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    $.ajax({
        url: '/class/edit',
        data: { id },
        type: 'POST',
        cache: false,
        timeout: 50000
    }).done(function (res) {
        // console.log(res)
        if (res.result == 0) {
            swal({
                title: "",
                text: "Không tồn tại lớp này",
                icon: "warning"
            });
        } else {
            $('#divModalEditClass').html(res.htmlModalEditClass)
            $('#editClassModal').modal('show');
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

function saveClass(class_id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var subCode = $.trim($("#txtEditSubjectCode").val());
    var teaPhone = $.trim($("#txtEditTeacherPhone").val());
    var room1 = $.trim($("#editRoom1").val());
    var room2 = $.trim($("#editRoom2").val());
    var day1 = $.trim($("#txtEditDay1").val());
    var day2 = $.trim($("#txtEditDay2").val());
    var timeStart1 = $.trim($("#editTimeStart1").val());
    var timeStart2 = $.trim($("#editTimeStart2").val());
    var timeEnd1 = $.trim($("#editTimeEnd1").val());
    var timeEnd2 = $.trim($("#editTimeEnd2").val());
    var status = $("#editStuClassStatus").val();
    // console.log(subCode)
    // console.log(teaPhone)
    // console.log(room1)
    // console.log(room2)
    // console.log(day1)
    // console.log(timeStart1)
    // console.log(timeEnd1)
    // console.log(day2)
    // console.log(timeStart2)
    // console.log(timeEnd2)
    // console.log(status)
    // console.log(class_id)
    if (subCode == "" || status == '') {
        swal({
            title: "Chưa nhập đầy đủ thông tin",
            text: "",
            icon: "warning"
        })
        return;
    }
    if ((day1 == '' || timeStart1 == '' || timeEnd1 == '' || room1 == '') && (day2 == '' || timeStart2 == '' || timeEnd2 == '' || room2 == '')) {
        swal({
            title: "Chưa nhập lịch học",
            text: "",
            icon: "warning"
        })
        return;
    }
    if (teaPhone != ''){
        checkedPhone(teaPhone)
    }
    $.ajax({
        url: '/class/save',
        type: 'POST',
        data: {
            status,
            class_id,
            subCode,
            teaPhone,
            room1,
            room2,
            day1,
            timeStart1,
            timeEnd1,
            day2,
            timeStart2,
            timeEnd2,
        },
        cache: false,
        timeout: 50000,
    }).done(function (res) {
        console.log(res.result)
        if (res.result == 0) {
            swal({
                title: "Không có giáo viên này",
                text: "",
                icon: "warning"
            })
            return;
        }
        if (res.result == 1) {
            swal({
                title: "Không có môn học này",
                text: "",
                icon: "warning"
            })
            return;
        }
        swal({
            title: "Chỉnh sửa thành công",
            text: "",
            icon: "success"
        })
        // $('#tableClass').html(res.htmlTable)
        getClass(1)
        $('#editClassModal').modal('hide');
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

function deleteClass(id){
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
                    url: '/class/delete',
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
                        getClass(1)
                    } else {
                        swal({
                            title: "Không tồn tại lớp này",
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