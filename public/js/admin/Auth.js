function submitChangePassword() {
    let myForm = document.getElementById('formchangePass');
    let formData = new FormData(myForm);
    if (formData.get('newPassword') !== formData.get('confirm')) {
        document.getElementById("mess").innerHTML = `<div class="alert alert-danger" style="text-align: center;" role="alert">
        Xác Nhận Mật Khẩu Mới Phải trùng với Mật Khẩu
      </div>`;
    } else {
        var url = `/admin/dang-nhap/thay-doi-mat-khau`;
        axios.post(url, {
            oldPassword: formData.get('oldPassword'),
            newPassword: formData.get('newPassword'),
            confirm: formData.get('confirm'),
        }).then(function (response) {
            document.getElementById("mess").innerHTML = `<div class="alert alert-${response.data.type}" style="text-align: center;" role="alert">
        ${response.data.mess}
      </div>`;
        });
    }
}