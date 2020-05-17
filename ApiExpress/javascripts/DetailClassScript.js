// $(document).ready(function() {

// });
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
    }).done(function(res) {
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
    }).done(function(res) {
        $('#tableDetailClass').html(res.htmlTable)
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
    });
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