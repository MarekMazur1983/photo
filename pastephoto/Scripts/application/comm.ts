namespace Communication {
    export class Comm {
        public static Send(message: any, modeasync: boolean, url: string, dataType: string, callback?: Function): any {
            var toJsonString = JSON.stringify(message);
            var res = null;
            $.ajax
                ({
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
    export class URLCONST {
        public static SAVE: string = document.location.origin + "/save/";
        public static LOGIN: string = document.location.origin + "/login/";
        public static UPDATE: string = document.location.origin + "/update";
    };
}




