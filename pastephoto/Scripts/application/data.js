var Communication;
(function (Communication) {
    class Response {
    }
    Communication.Response = Response;
    var Status;
    (function (Status) {
        Status[Status["OK"] = 0] = "OK";
        Status[Status["ERROR"] = 1] = "ERROR";
    })(Status = Communication.Status || (Communication.Status = {}));
    class Settings {
    }
    Communication.Settings = Settings;
    class Image {
    }
    Communication.Image = Image;
})(Communication || (Communication = {}));
//# sourceMappingURL=data.js.map