$(document).ready(function() {
    $('#tabStudent a').css({ "background-color": "#17a2b8", "color": "#fff" })
    getStudent(1)
    $('#btnSearch').click(function() {
        searchStudent(1)
    })
    $('#txtAddBirthday').datepicker({
        weekStart: 1,
        daysOfWeekHighlighted: "6,0",
        autoclose: true,
        todayHighlight: true,
        orientation: "bottom auto",
    });
    $('#txtAddBirthday').datepicker("setDate", new Date());
    $('#txtEditBirthday').datepicker({
        weekStart: 1,
        daysOfWeekHighlighted: "6,0",
        autoclose: true,
        todayHighlight: true,
        orientation: "bottom auto",
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
    }).done(function(res) {
        $('#tableStudent').html(res.htmlTable)
            // $('#paginateActive').css({ "background-color": "#17a2b8", "color": "#fff" })
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
        getStudent(1)
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
    }).done(function(res) {
        // console.log(res.htmlTable)
        $('#tableStudent').html(res.htmlTable)
            // $('#paginateActive').css({ "background-color": "#17a2b8", "color": "#fff" })
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
                }).done(function(res) {
                    // console.log(res.result)
                    if (res.result == 1) {
                        swal({
                            title: "Xóa thành công!",
                            text: "",
                            icon: "success"
                        });
                        getStudent(1)
                    } else {
                        swal({
                            title: "Không tồn tại sinh viên này",
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

const addStudent = async() => {
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
        //get file image
    var fileUpload = $("#ImageStudent").get(0);
    var files = fileUpload.files;

    if (name == '' || mssv == '' || phone == '' || birthday == '' || address == '') {
        swal({
            title: "Chưa nhập đầy đủ thông tin",
            text: "",
            icon: "warning"
        })
        return;
    }
    // checkedMssv(mssv)
    // checkedPhone(phone)
    // checkedMail(email)
    // console.log(files.length);
    if (files.length <= 0) {
        swal({
            title: "Chưa thêm ảnh sinh viên",
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
    var srcImg = window.location.origin + "/upload/" + fileName
        // console.log(typeof files)
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
            sex: sex ? 0 : 1,
            url_avatar: srcImg
        },
        cache: false,
        timeout: 50000,
    }).done(function(res) {
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
        uploadImage(fileData)
        getStudent(1)
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
    }).done(function(res) {
        // console.log(res)
        if (res.result == 0) {
            swal({
                title: "Không tồn tại sinh viên này",
                text: "",
                icon: "warning"
            });
        } else {
            $('#divModalEditStudent').html(res.htmlModalEditStudent)
            $('#EditStudentModal').modal('show');
        }
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
    var srcImg = $('#editImageStudent').attr('data-default-file')
    var fileUpload = $("#editImageStudent").get(0);
    var files = fileUpload.files;

    // console.log(files.length)

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
    if (files.length > 0) {
        var fileData = new FormData();
        var fileName = "";
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
            fileName = files[i].name;
        }
        srcImg = window.location.origin + "/upload/" + fileName
    }
    if (srcImg == null) {
        swal({
            title: "Cần thêm ảnh cho sinh viên",
            text: "",
            icon: "warning"
        })
        return;
    }
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
            sex: sex ? 0 : 1,
            url_avatar: srcImg
        },
        type: 'POST',
        cache: false,
        timeout: 50000
    }).done(function(res) {
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
        uploadImage(fileData)
        $("#EditStudentModal").modal("hide");
        $("#txtEditName").val("");
        $("#txtEditPhone").val("");
        $("#txtEditMssv").val("");
        $("#txtEditAddress").val("");
        $("#txtEditEmail").val("");
        swal({
            title: "Cập nhập thành công",
            text: "",
            icon: "success"
        })
        getStudent(1)
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
    }).done(function(res) {
        // console.log(res)
        if (res.result == 0) {
            swal({
                title: "Không tồn tại sinh viên này",
                text: "",
                icon: "warning"
            });
        } else {
            swal({
                title: "Cài lại mật khẩu thành công",
                text: "",
                icon: "success"
            })
            $('#EditStudentModal').modal('hide');
        }
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

// function detailStudent(id) {
//     if (!navigator.onLine) {
//         swal({
//             title: "Kiểm tra kết nối internet!",
//             text: "",
//             icon: "warning"
//         })
//         return;
//     }
//     $.ajax({
//         url: '/student/detail',
//         data: { id },
//         type: 'POST',
//         cache: false,
//         timeout: 50000
//     }).done(function (res) {
//         // console.log(res)
//         if (res.result == 0) {
//             swal({
//                 title: "Không tồn tại sinh viên này",
//                 text: "",
//                 icon: "warning"
//             });
//         } else {
//             $('#divModalDetailStudent').html(res.htmlModalDetailStudent)
//             $('#detailStudentModal').modal('show');
//         }
//         return;
//     }).fail(function (jqXHR, textStatus, errorThrown) {
//         // If fail
//         swal({
//             title: "Đã có lỗi xảy ra",
//             text: "",
//             icon: "warning",
//             dangerMode: true,
//         })
//         // console.log(textStatus + ': ' + errorThrown);
//         return;
//     })
// }
function importStudent() {
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
    if (typeof(FileReader) != "undefined") {
        var reader = new FileReader();

        reader.onload = function(e) {

            // var data = e.target.result;
            // var workbook = XLSX.read(data, { type: 'binary', cellDates: true, cellStyles: true });
            var binary = "";
            var bytes = new Uint8Array(e.target.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            // call 'xlsx' to read the file
            var workbook = XLSX.read(binary, { type: 'binary', cellDates: true, cellStyles: true });
            var firstSheet = workbook.SheetNames[0];
            var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
            // var json = JSON.stringify(excelRows)

            var fileData = new FormData();
            var fileName = "";
            for (var i = 0; i < excelRows[1].__proto__.length; i++) {
                fileData.append(excelRows[1].__proto__[i].name, excelRows[1].__proto__[i], 'test.jpg');
                // fileName = excelRows[1].__proto__[i].name;
            }
            // console.log(fileData)
            // console.log(fileName)
            uploadImage(fileData)
        };
        reader.readAsArrayBuffer(fileUpload.files[0]);
    } else {
        alert("Please upload a valid Excel file.");
    }
    // var fileUpload = $("#txtFile")[0];
    // var reader = new FileReader();
    // reader.readAsArrayBuffer(e.target.files[0]);
    // var data = new Uint8Array(reader.result);
    // console.log(data)


    // console.log('dsdsd')
    // // var fileData = new FormData();
    // // var fileName = "";
    // // for (var i = 0; i < files.length; i++) {
    // //     fileData.append(files[i].name, files[i]);
    // //     fileName = files[i].name;
    // // }
    // $.ajax({
    //     url: '/student/import',
    //     data: { formData },
    //     type: 'POST',
    //     cache: false,
    //     timeout: 50000
    // }).done(function(res) {
    //     console.log(res.result)
    //         // if (res.result == 0) {
    //         //     swal({
    //         //         title: "",
    //         //         text: "Không tồn tại sinh viên này",
    //         //         icon: "warning"
    //         //     });
    //         // } else {
    //         //     $('#divModalDetailStudent').html(res.htmlModalDetailStudent)
    //         //     $('#detailStudentModal').modal('show');
    //         // }
    //     return;
    // }).fail(function(jqXHR, textStatus, errorThrown) {
    //     // If fail
    //     swal({
    //         title: "Đã có lỗi xảy ra",
    //         text: "",
    //         icon: "warning",
    //         dangerMode: true,
    //     })
    //     console.log(textStatus + ': ' + errorThrown);
    //     return;
    // })
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

function uploadImage(fileData) {
    $.ajax({
        url: "/uploadAvatar",
        type: 'POST',
        data: fileData,
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        cache: false,
        enctype: 'multipart/form-data'
    }).done(function(res) {
        if (res.result == 0) {
            swal({
                title: "Không thể upload ảnh",
                text: "",
                icon: "warning"
            })
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
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