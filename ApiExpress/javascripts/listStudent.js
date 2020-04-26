
$(document).ready(function () {
    $('#tabStudent a').css({ "background-color": "#17a2b8", "color": "#fff" })
    getStudent(1)
    $('#btnSearch').click(function(){
        searchStudent(1)
    })
});

function getStudent(currentPage) {
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
        console.log(textStatus + ': ' + errorThrown);
        return;
    })
}

function searchStudent(currentPage) {
    var name = $.trim($("#txtName").val());
    var mssv = $.trim($("#txtMssv").val());

    if (name == "" && mssv == "") {
        return;
    }
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
        console.log(textStatus + ': ' + errorThrown);
        return;
    });


}

function deleteStudent(id) {
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
                        id: id
                    },
                    cache: false,
                    timeout: 50000,
                }).done(function (res) {

                    swal({
                        title: "Thông báo",
                        text: "Xóa thành công!",
                        icon: "success"
                    });
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
        });
}


// function newTable(data, number) {
//     var tbodyTableStudent = document.getElementById('tbodyTableStudent')
//     var _paginate = document.getElementById('_paginate')
//     tbodyTableStudent.innerHTML = ''
//     _paginate.innerHTML = ''
//     for (var i = 0; i < number; i++) {
//         var row = `<tr>
//                         <td>${i + 1}</td>
//                         <td>${data[i].mssv}</td>
//                         <td>${data[i].name}</td>
//                         <td>${data[i].phone}</td>
//                         <td>${data[i].birthday}</td>
//                         <td>${data[i].address}</td>
//                         <td>${data[i].email}</td>
//                         <td>${data[i].sex == 1 ? 'Nam' : 'Nữ'}</td>
//                         <td>
//                             <button type="button" class="btn btn-success" onclick="editStudent(${data.id})"; data-toggle="tooltip" data-target="" title="Sửa Danh Mục">
//                                 <i class="far fa-edit"></i>
//                             </button>
//                             <button type="button" class="btn btn-danger" title="Xóa Danh Mục" onclick="deleteStudent(${data.id}")>
//                                 <i class="far fa-trash-alt"></i>
//                             </button>
//                         </td>
//                    </tr>`
//         tbodyTableStudent.innerHTML += row
//     }
// }
