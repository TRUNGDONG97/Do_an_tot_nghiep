$(document).ready(function () {
    $('#tabTeacher a').css({ "background-color": "#17a2b8", "color": "#fff" })
    getTeacher(1)
    $('#btnSearchTeacher').click(function () {
        searchTeacher(1)
    })
    $('#txtAddBirthday').datepicker({
        weekStart: 1,
        daysOfWeekHighlighted: "6,0",
        autoclose: true,
        todayHighlight: true,
        orientation: "bottom auto",
    });
    $('#txtAddBirthday').datepicker("setDate", new Date());

});

function getTeacher(currentPage) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    $.ajax({
        url: '/getTeacher',
        type: 'POST',
        data: { currentPage },
        cache: false,
        timeout: 50000,
    }).done(function (res) {
        $('#tableTeacher').html(res.htmlTable)
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
        console.log(textStatus + ': ' + errorThrown);
        return;
    })
}

function searchTeacher(currentPage) {
    // alert(currentPage)
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var name = $.trim($("#txtSearchTeacherName").val());
    var phone = $.trim($("#txtSearchTeacherPhone").val());
    var status = $('#searchTeacherStatus').val();
    if (name == "" && phone == "" && status == "") {
        getTeacher(1)
        return;
    }
    // checkedPhone(phone)
    $.ajax({
        url: '/teacher/search',
        type: 'POST',
        data: {
            name,
            phone,
            status,
            currentPage
        },
        // dataType: "json",
        cache: false,
        timeout: 50000,
    }).done(function (res) {
        $('#tableTeacher').html(res.htmlTable)
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

function addTeacher() {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var name = $.trim($("#txtAddName").val());
    var phone = $.trim($("#txtAddPhone").val());
    var birthday = $.trim($("#txtAddBirthday").val());
    var address = $.trim($("#txtAddAddress").val());
    var email = $.trim($("#txtAddEmail").val());
    var sex = $('#addSexFemale').prop('checked')
    var status = $('#addTeacherStatus').val();
    var salary = $('#txtAddSalary').val();
    //get file image
    var fileUpload = $("#ImageTeacher").get(0);
    var files = fileUpload.files;
    if (name == '' || phone == '' || birthday == '' || address == '' || status == '' || salary == '') {
        swal({
            title: "Chưa nhập đầy đủ thông tin",
            text: "",
            icon: "warning"
        })
        return;
    }
    checkedPhone(phone)
    checkedMail(email)
    // console.log(files.length);
    if (files.length <= 0) {
        swal({
            title: "Chưa thêm ảnh ",
            text: "",
            icon: "warning"
        })
        return;
    }
    var fileData = new FormData();
    var fileName = "";
    for (var i = 0; i < files.length; i++) {
        fileData.append(files[i].name, files[i]);
        fileName = files[i].name;
    }
    var srcImg = window.location.origin + "/upload/" + fileName.replace(/ /g, "_");

    $.ajax({
        url: "/teacher/add",
        type: 'POST',
        data: {
            name,
            phone,
            email,
            birthday,
            address,
            status,
            sex: sex ? 0 : 1,
            url_avatar: srcImg,
            salary
        },
        cache: false,
        timeout: 50000,
        beforeSend:function(){
            $('#modalLoad').modal('show');
        }
    }).done(function (res) {
        // console.log(res.result)
        if (res.result == 0) {
            $('#modalLoad').modal('hide');
            $("#txtAddPhone").val("");
            swal({
                title: "Số điện thoại đã tồn tại",
                text: "",
                icon: "warning"
            })
            return;
        }
        if (res.result == 1) {
            $('#modalLoad').modal('hide');
            $("#txtAddEmail").val("");
            swal({
                title: "Email đã tồn tại",
                text: "",
                icon: "warning"
            })
            return;
        }
        uploadImage(fileData)
        $("#addTeacherModal").modal("hide");
        $("#txtAddName").val("");
        $("#txtAddPhone").val("");
        $("#txtAddAddress").val("");
        $("#txtAddEmail").val("");
        $('#modalLoad').modal('hide');
        swal({
            title: "Thêm thành công",
            text: "",
            icon: "success"
        })
        getTeacher(1)
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

function deleteTeacher(id) {
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
                    url: '/teacher/delete',
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
                            title: "Xóa thành công!",
                            text: "",
                            icon: "success"
                        });
                        getTeacher(1)
                    } else {
                        swal({
                            title: "Không tồn tại giáo viên này",
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

function editTeacher(id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    $.ajax({
        url: '/teacher/edit',
        data: { id },
        type: 'POST',
        cache: false,
        timeout: 50000,
        beforeSend:function(){
            $('#modalLoad').modal('show');
        }
    }).done(function (res) {
        // console.log(res)
        if (res.result == 0) {
            $('#modalLoad').modal('hide');
            swal({
                title: "Không tồn tại giáo viên này",
                text: "",
                icon: "warning"
            });
        } else {
            $('#modalLoad').modal('hide');
            $('#divModalEditTeacher').html(res.htmlModalEditTeacher)
            $('#editTeacherModal').modal('show');
        }
        return;
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
        url: '/teacher/resetPass',
        data: { id },
        type: 'POST',
        cache: false,
        timeout: 50000
    }).done(function (res) {
        // console.log(res)
        if (res.result == 0) {
            swal({
                title: "",
                text: "Không tồn tại giáo viên này",
                icon: "warning"
            });
        } else {
            swal({
                title: "Cài lại mật khẩu thành công",
                text: "",
                icon: "success"
            })
            $('#editTeacherModal').modal('hide');
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

function saveTeacher(id) {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var name = $.trim($("#txtEditName").val());
    var phone = $.trim($("#txtEditPhone").val());
    var birthday = $.trim($("#txtEditBirthday").val());
    var address = $.trim($("#txtEditAddress").val());
    var email = $.trim($("#txtEditEmail").val());
    var salary = $.trim($("#txtEditSalary").val());
    var status = $('#editTeacherStatus').val();
    var sex = $('#editSexFemale').prop('checked')
    var srcImg = $('#imageTeacher').attr('data-default-file')

    var fileUpload = $("#imageTeacher").get(0);
    var files = fileUpload.files;

    // console.log(name)
    // console.log(phone)
    // console.log(birthday)
    // console.log(address)
    // console.log(email)
    // console.log(salary)
    // console.log(status)
    // console.log(sex)


    if (name == '' || phone == '' || birthday == '' || address == '' || status == '' || salary == '' || email == '') {
        swal({
            title: "Chưa nhập đầy đủ thông tin",
            text: "",
            icon: "warning"
        })
        return;
    }
    checkedPhone(phone)
    checkedMail(email)
    if (files.length > 0) {
        var fileData = new FormData();
        var fileName = "";
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
            fileName = files[i].name;
        }
        srcImg = window.location.origin + "/upload/avatarStudent/" + fileName.replace(/ /g, "_");
    }
    // console.log(srcImg)
    if (srcImg == null) {
        swal({
            title: "Cần thêm ảnh cho giáo viên",
            text: "",
            icon: "warning"
        })
        return;
    }
    $.ajax({
        url: '/teacher/save',
        data: {
            id,
            name,
            phone,
            birthday,
            address,
            email,
            salary,
            sex: sex ? 0 : 1,
            url_avatar: srcImg,
            status
        },
        type: 'POST',
        cache: false,
        timeout: 50000,
        beforeSend:function(){
            $('#modalLoad').modal('show');
        }
    }).done(function (res) {
        // console.log(res.result)

        if (res.result == 0) {
            $('#modalLoad').modal('hide');
            swal({
                title: "Số điện thoại đã tồn tại",
                text: "",
                icon: "warning"
            })
            return;
        }
        if (res.result == 1) {
            $('#modalLoad').modal('hide');
            swal({
                title: "Email đã tồn tại",
                text: "",
                icon: "warning"
            })
            return;
        }
        uploadImage(fileData)
        $("#editTeacherModal").modal("hide");
        $('#modalLoad').modal('hide');
        // $("#txtEditName").val("");
        // $("#txtEditPhone").val("");
        // $("#txtEditAddress").val("");
        // $("#txtEditEmail").val("");
        swal({
            title: "Cập nhập thành công",
            text: "",
            icon: "success"
        })
        getTeacher(1)
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

function detailClassTeacher(id) {
    // var name =teacher.attr('data-name');
    // const nameTeacher=name.split(' ').join('-')
    // alert(id)
    // window.location.href = '/admin/class?name=' + nameTeacher;
    $.ajax({
        url: '/getTeacherID',
        data: { id },
        type: 'POST',
        cache: false,
        timeout: 50000
    }).done(function (res) {
        const nameTeacher = res.teacher.name.split(' ').join('-')
        window.location.href = '/admin/class?name=' + nameTeacher;
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
function importTeacher() {
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
    var arrTeacher
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
        var workbook = XLSX.read(binary, { type: 'binary', cellDates: true, cellStyles: true });
        var firstSheet = workbook.SheetNames[0];
        arrTeacher = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        // console.log(arrTeacher[0].name)
        // console.log(arrTeacher[0])
        if (arrTeacher.length == 0) {
            swal({
                title: "File không có dữ liệu",
                text: "",
                icon: "warning"
            })
            return;
        }
        $('#mdImport').modal('hide')
        $.ajax({
            url: '/teacher/import',
            data: { listTeacher: JSON.stringify(arrTeacher) },
            type: 'POST',
            beforeSend: function () {
                $('#modalLoad').modal('show');
            },
        }).done(function (res) {

            // console.log(res.result)
            getTeacher(1)
            $('#modalLoad').modal('hide');
            swal({
                title: " Thành công",
                text: "",
                icon: "success"
            })
            return;
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
    };
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

function uploadImage(fileData) {
    $.ajax({
        url: "/uploadFile",
        type: 'POST',
        data: fileData,
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        cache: false,
        enctype: 'multipart/form-data'
    }).done(function (res) {
    
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
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