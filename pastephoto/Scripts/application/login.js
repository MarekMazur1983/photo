$(document).ready(function () {
    var app = new Login();
});
class Login {
    constructor() {
        this.loginBtn = $("#login");
        this.textbox = $("input");
        this.guid = $('body').attr('id');
        this.loginBtn.click(() => { this.login(); });
        $(document).keypress((e) => {
            if (e.which == 13) {
                this.login();
            }
        });
    }
    getValues() {
        var settings = new Communication.Settings();
        return settings;
    }
    checkValues() {
    }
    login() {
        var pass = this.textbox.val();
        var res = Communication.Comm.Send({ password: pass, guid: this.guid }, false, Communication.URLCONST.LOGIN, "html");
        if (res.status == Communication.Status.OK) {
            this.redirect(document.location.origin + "/" + this.guid, "password", pass);
        }
        else {
            $('h4').slideDown(500);
        }
    }
    redirect(redirectUrl, arg, value) {
        var form = $('<form style ="opacity:0" action="' + redirectUrl + '" method="post">' +
            '<input type="hidden" name="' + arg + '" value="' + value + '"></input>' + '</form>');
        $('body').append(form);
        $(form).submit();
    }
    ;
}
//# sourceMappingURL=login.js.map