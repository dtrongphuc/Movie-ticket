$("#submit").click(function () {
    let formData = $('#form').serializeArray();
    let validation = true;
    $.each(formData, function (i, v) {
        if (v.value == "") {
            console.log("error");
            validation = false;
        };
    });
    if (validation) {
        if ($("#loading").css("display") == "none") {
            $('#loading').css({ display: 'block' });
        }
    }
});