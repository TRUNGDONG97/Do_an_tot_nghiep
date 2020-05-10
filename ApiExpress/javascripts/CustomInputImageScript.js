$(document).ready(function () {
    var drEvent = $('.dropify').dropify({
        messages: {
            default: 'Click vào để chọn ảnh',
            replace: 'Click vào để chọn ảnh khác',
            remove: 'Xóa ảnh'
        }

    });
    drEvent.on('dropify.error.fileSize', function (event, element) {
        swal({
            title: "Dung lượng file quá lớn",
            text: "",
            icon: "warning",
            dangerMode: true
        })
    });
    drEvent.on('dropify.errors', function (event, element) {
        swal({
            title: "Đã có lỗi xảy ra.",
            text: "",
            icon: "warning",
            dangerMode: true
        })
    });
    drEvent.on('dropify.error.minWidth', function (event, element) {
        alert('Min width error message!');
    });
    drEvent.on('dropify.error.maxWidth', function (event, element) {
        alert('Max width error message!');
    });
    drEvent.on('dropify.error.minHeight', function (event, element) {
        alert('Min height error message!');
    });
    drEvent.on('dropify.error.maxHeight', function (event, element) {
        alert('Max height error message!');
    });
    drEvent.on('dropify.error.imageFormat', function (event, element) {
        alert('Image format error message!');
    });
});

