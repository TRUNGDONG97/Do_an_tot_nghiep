// $(document).ready(function () {
//     $('.datepicker').datepicker({
//         weekStart: 1,
//         daysOfWeekHighlighted: "6,0",
//         autoclose: true,
//         todayHighlight: true,
//         orientation: "bottom auto",
//     });
// });

function logout() {
    window.location = '/admin/logout';
}
function changePassword() {
    if (!navigator.onLine) {
        swal({
            title: "Kiểm tra kết nối internet!",
            text: "",
            icon: "warning"
        })
        return;
    }
    var currentPassword = $.trim($("#txtCurrentPassword").val());
    var newPassword = $.trim($("#txtNewPassword").val());
    var confirmPassword = $.trim($("#txtConfirmPassword").val());

    if (currentPassword == "" || newPassword == "" || confirmPassword == "") {
        swal({
            title: "Vui lòng nhập đầy đủ!",
            text: "",
            icon: "warning"
        })
        return;
    }
    if (newPassword == currentPassword) {
        $("#txtNewPassword").val("");
        $("#txtConfirmPassword").val("");
        swal({
            title: "Mật khẩu mới giống mật khẩu hiện tại",
            text: "",
            icon: "warning"
        })
        return;
    }
    if (newPassword != confirmPassword) {
        $("#txtConfirmPassword").val("");
        swal({
            title: "Mật khẩu xác nhận không đúng",
            text: "",
            icon: "warning"
        })
        return;
    }
    
    $.ajax({
        url: '/user/changePass',
        data: {
            CurrentPassword: currentPassword,
            NewPassword: newPassword
        },
        type: 'POST',
        dataType: "json",
        cache: false,
        timeout: 50000,
    }).done(function(response) {
        // If successful
    //    console.log(data);
    if (response.result == 1) {
        $("#changePass").modal("hide");
        $("#txtNewPassword").val("");
        $("#txtConfirmPassword").val("");
        $("#txtCurrentPassword").val("");
        swal({
            title: "Đổi mật khẩu thành công",
            text: "",
            icon: "success"
        })
        return;
    } else {
        if (response.result == 0) {
            $("#txtCurrentPassword").val("");
            swal({
                title: "Mật khẩu cũ không đúng",
                text: "",
                icon: "warning"
            })
            return;
        } else {
            swal({
                title: "Không thể đổi mật khẩu",
                text: "",
                icon: "warning"
            })
            return;
        }
    }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // If fail
        swal({
            title: "Đã có lỗi xảy ra",
            text: "",
            dangerMode: true,
            icon: "warning"
        })
        console.log(textStatus + ': ' + errorThrown);
        return;
    });
}
