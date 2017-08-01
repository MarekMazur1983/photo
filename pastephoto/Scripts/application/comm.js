var Communication;
(function (Communication) {
    class Comm {
        static Send(message, modeasync, url, dataType, callback) {
            var toJsonString = JSON.stringify(message);
            var res = null;
            $.ajax({
                url: url,
                type: 'post',
                dataType: dataType,
                data: { "json": toJsonString },
                async: modeasync,
                success: function (data) {
                    res = $.trim(data);
                    if (callback != null) {
                        callback(JSON.parse(res));
                    }
                },
                error: function (data) {
                    console.log(data.responseText);
                }
            });
            return JSON.parse(res);
        }
    }
    Communication.Comm = Comm;
    class URLCONST {
    }
    URLCONST.SAVE = document.location.origin + "/save/";
    URLCONST.LOGIN = document.location.origin + "/login/";
    URLCONST.UPDATE = document.location.origin + "/update";
    Communication.URLCONST = URLCONST;
    ;
})(Communication || (Communication = {}));
//# sourceMappingURL=comm.js.map