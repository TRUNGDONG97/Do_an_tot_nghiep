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
function importSubject() {
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
        console.log(namefile,'formData')    

        uploadFile(formData, namefile)
        // $('#modalLoad').modal('hide');
    };
}
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i)
        view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
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
            url: '/subject/import',
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
            getSubject(1)
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
//        var vnf_regex = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g;
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
//         url: "/uploadFile",
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