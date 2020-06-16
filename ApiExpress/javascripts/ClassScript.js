$(document).ready(function () {
    $('#tabClass a').css({ "background-color": "#17a2b8", "color": "#fff" })
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    if (urlParams.get("name")) {
        const name = urlParams.get("name")
        const nameTeacher = name.split('-').join(' ')
        // alert(nameTeacher)
        $('#divSearch').html('');
        getClassTeacher(nameTeacher.trim());
        // $('#paginateClass').html('s');
    } else {
        getClass(1)
    }

    $('#btnSearchClass').click(function () {
        searchClass(1)
        // alert('đá')
    })
});
function getClassTeacher(nameTeacher) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    $.ajax({
        url: '/getClass/Teacher',
        type: 'POST',
        data: { nameTeacher },
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
    // var teacherName = $.trim($("#txtSearchClassTeacher").val());
    // var mssv = $.trim($("#txtSearchSubjectMSSV").val());
    var claStatus = $("#seachClassStatus").val()
    // alert(teacherName)
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
            currentPage,
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
    var schedule1 = $.trim($("#schedule1").val());
    var schedule2 = $.trim($("#schedule2").val());
    console.log(schedule1, schedule2)
    if (subCode == "" || claCode == '') {
        swal({
            title: "Chưa nhập đầy đủ thông tin",
            text: "",
            icon: "warning"
        })
        return;
    }
    if (schedule1 == '' && schedule2 == '') {
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
            schedule1,
            schedule2
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
            $("#schedule1").val("");
            $("#schedule2").val("");

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
        $("#schedule1").val("");
        $("#schedule2").val("");

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
            $('#divModalEditClass').html(res.htmlModalEditClass);
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
    var schedule1 = $.trim($("#editSchedule1").val());
    var schedule2 = $.trim($("#editSchedule2").val());
    var status = $("#editStuClassStatus").val();
    console.log(teaPhone)
    if (subCode == "" || status == '') {
        swal({
            title: "Chưa nhập đầy đủ thông tin",
            text: "",
            icon: "warning"
        })
        return;
    }
    if (schedule1 == '' && schedule2 == '') {
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
        url: '/class/save',
        type: 'POST',
        data: {
            class_id,
            status,
            subCode,
            schedule1,
            schedule2,
            teaPhone,
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

function deleteClass(id, class_code) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    swal({
        title: "Bạn chắc chắn hủy lớp" + class_code + " ?",
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
                }).done(function (res) {
                    // console.log(res.result)
                    if (res.result == 1) {
                        swal({
                            title: "Hủy thành công!",
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
function updateStatus() {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    swal({
        title: "Bạn chắc chắn cập nhật trạng thái hoàn thành cho tất cả các lớp ?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true
    })
        .then((isConFirm) => {
            if (isConFirm) {
                $.ajax({
                    url: '/class/updateAllStatusClass',
                    type: 'POST',
                    data: {},
                    cache: false,
                    timeout: 50000,
                    beforeSend: function () {
                        $('#modalLoad').modal('show');
                    }
                }).done(function (res) {
                    // console.log(res.result)
                    $('#modalLoad').modal('hide');
                    swal({
                        title: "Cập nhật thành công",
                        text: "",
                        icon: "warning"
                    });
                    getClass(1)

                }).fail(function (jqXHR, textStatus, errorThrown) {
                    // If fail
                    $('#modalLoad').modal('hide');
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
function importClass() {
    var fileUpload = $("#txtFile").get(0);
    var files = fileUpload.files;
    if (files.length <= 0) {
        swal({
            title: "Chưa chọn file ",
            text: "",
            icon: "warning"
        })
        return;
    }
    $('#mdImport').modal('hide')
    $('#modalLoad').modal('show');
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileUpload.files[0]);
    reader.onload = function (e) {

        var binary = "";
        var bytes = new Uint8Array(e.target.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        // call 'xlsx' to read the file
        var workbook = XLSX.read(binary,
            {
                type: 'binary',
                cellDates: true,
                cellStyles: true,
                cellNF: true,
                cellText: false
            });
        // var firstSheet = workbook.SheetNames[0];
        // arrStudent = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        // console.log(arrStudent[0])
        var wopts = { bookType: 'xlsx', bookSST: false, type: 'base64' };
        var wbout = XLSX.write(workbook, wopts);
        // console.log(wbout)
        var blob = new Blob([s2ab(atob(wbout))], { type: 'application/octet-stream' });
        var formData = new FormData();
        formData.append('filetoupload', blob, files[0].name);
        var namefile = files[0].name.replace(/ /g, "_");
        // console.log(formData,'formData')

        uploadFile(formData, namefile)
        // $('#modalLoad').modal('hide');
    };
}
function uploadFile(fileData, namefile) {
    $.ajax({
        url: "/uploadFile",
        type: 'POST',
        data: fileData,
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        cache: false,
        enctype: 'multipart/form-data'
    }).done(function (res) {
        $.ajax({
            url: '/class/import',
            data: { namefile },
            type: 'POST',
        }).done(function (res) {
            if(res.result==0){
                $('#modalLoad').modal('hide');
                swal({
                    title: "File chưa có dữ liệu",
                    text: "",
                    icon: "warning",
                })
                return;
            }
            if(res.result==2){
                $('#modalLoad').modal('hide');
                swal({
                    title: "Form file sai",
                    text: "",
                    icon: "warning",
                })
                return;
            }
            $('#modalLoad').modal('hide');
            swal({
                title: "Thêm  thành công",
                text: "",
                icon: "warning"
            });
            $("#txtFile").val("")
            getClass(1)
            // console.log(res)

        }).fail(function (jqXHR, textStatus, errorThrown) {
            // If fail
            $('#modalLoad').modal('hide');
            swal({
                title: "Đã có lỗi xảy ra",
                text: "",
                icon: "warning",
                dangerMode: true,
            })
            console.log(textStatus + ': ' + errorThrown);
            return;
        })

    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        $('#modalLoad').modal('hide');
        swal({
            title: "Đã có lỗi xảy ra",
            text: "",
            icon: "warning",
            dangerMode: true,
        })
        // console.log(textStatus + ': ' + errorThrown.message);
        // console.log(jqXHR);
    })
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
// conver string to arr
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i)
        view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}