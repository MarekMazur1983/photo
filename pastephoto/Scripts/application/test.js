$(document).ready(function () {
    $("#test").dropzone({ url: "/Home/Uploadfile" });
    Dropzone.options.dropzoneForm = {
        init: function () {
            this.on("complete", function (data) {
                //var res = eval('(' + data.xhr.responseText + ')');
                var res = JSON.parse(data.xhr.responseText);
            });
        }
    };
});
//# sourceMappingURL=test.js.map