// $(document).ready(function () {
//     $('#logout').click(function (e) {
//         // if (confirm("Are you sure you want to logout?"))
//         //     window.location.href = "http://localhost/login.php";

//         // return false;
//         alert('ahdasd')
//     })
// });

function logout() {
    window.location = '/logout';
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
    if (response.type == "SUCCESS") {
        $("#changePass").modal("hide");
        swal({
            title: "Đổi mật khẩu thành công",
            text: "",
            icon: "success"
        })
    } else {
        if (response.type == "WRONG_PASSWORD") {
            $("#txtCurrentPassword").val("");
            swal({
                title: "Mật khẩu cũ không đúng",
                text: "",
                icon: "warning"
            })
        } else {
            swal({
                title: "Không thể đổi mật khẩu",
                text: "",
                icon: "warning"
            })
        }
    }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // If fail
        console.log(textStatus + ': ' + errorThrown);
    });
    // $.ajax({
    //     url: '/user/changePass',
    //     data: {
    //         CurrentPassword: currentPassword,
    //         NewPassword: newPassword
    //     },
    //     type: 'POST',
    //     dataType: "json",
    //     cache: false,
    //     timeout: 50000,
    //     success: function (response) {
    //         //  alert(response.type == "SUCCESS")
    //         // console.log("elll")
    //         if (response.type == "SUCCESS") {
    //             $("#changePass").modal("hide");
    //             swal({
    //                 title: "Đổi mật khẩu thành công",
    //                 text: "",
    //                 icon: "success"
    //             })
    //         } else {
    //             if (response.type == "WRONG_PASSWORD") {
    //                 $("#txtCurrentPassword").val("");
    //                 swal({
    //                     title: "Mật khẩu cũ không đúng",
    //                     text: "",
    //                     icon: "warning"
    //                 })
    //             } else {
    //                 swal({
    //                     title: "Không thể đổi mật khẩu",
    //                     text: "",
    //                     icon: "warning"
    //                 })
    //             }
    //         }
    //     },
    //     error: function (result) {
    //         // console.log(result);
    //         alert('co loi')
    //         // swal({
    //         //     title: "Có lỗi",
    //         //     text: "",
    //         //     icon: "warning"
    //         // })
    //     }
    // });

}
