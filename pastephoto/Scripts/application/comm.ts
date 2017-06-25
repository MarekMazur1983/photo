namespace Communication {
    export class Comm {
        public static Send(message: any, modeasync: any, url: string, dataType: string): any {
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

                    },
                    error: function (data) {
                        console.log(data.responseText);
                    }
                });
            return JSON.parse(res);
        }
    }
    export class URLCONST {
        public static SERVICEBROKER: string = document.location.origin + "/Home/Save/";

    };
}




