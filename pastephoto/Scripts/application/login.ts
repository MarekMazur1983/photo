$(document).ready(function () {

    var app = new Login();

})

class Login {
    private loginBtn: JQuery = $("#login");
    private textbox: JQuery =$("input");
    private guid: string = $('body').attr('id');
    private link: JQuery;
    constructor() {
       
        this.loginBtn.click(() => { this.login(); });
        $(document).keypress((e) =>{
            if (e.which == 13) {
                this.login();
            }
        });
    }
    private getValues(): Communication.Settings {
        var settings = new Communication.Settings();
       
        return settings;
    }
    private checkValues() {

    }
    private login() {
        var pass = this.textbox.val();

        var res: Communication.Response = Communication.Comm.Send({ password: pass, guid: this.guid }, false, Communication.URLCONST.LOGIN, "html");
        if (res.status == Communication.Status.OK) {
            this.redirect(document.location.origin + "/" + this.guid, "password", pass);
           
        }
        else {
            $('h4').slideDown(500);
        }
    }
    private redirect(redirectUrl, arg, value) {
        var form = $('<form style ="opacity:0" action="' + redirectUrl + '" method="post">' +
        '<input type="hidden" name="' + arg + '" value="' + value + '"></input>' + '</form>');
        $('body').append(form);
        $(form).submit();
    };

}

