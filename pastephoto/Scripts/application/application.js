$(document).ready(function () {
    var app = new Application();
});
class Application {
    constructor() {
        this.settings_panel = $("#settings-panel");
        this.select_gallery = $('#select-gallery');
        this.name = $('#text-name');
        this.cb_password = $("#cb-password");
        this.text_password = $('#text-password');
        this.cb_lifetime = $('#cb-lifetime');
        this.text_lifetime = $('#text-lifetime');
        this.cb_watermark = $('#cb-watermark');
        this.cb_select = $('#cb-select');
        this.text_select = $('#text-select');
        this.cb_comments = $('#cb-comments');
        this.cb_ratings = $('#cb-ratings');
        this.cb_fb = $('#cb-ratings');
        this.saveBtn = $(".panel-footer button");
        this.guid = $('body').attr('id');
        this.settings_panel.slideDown(500);
        this.addCheckboxOnChange(this.cb_password, this.text_password);
        this.addCheckboxOnChange(this.cb_lifetime, this.text_lifetime);
        this.addCheckboxOnChange(this.cb_select, this.text_select);
        this.saveBtn.click(() => { this.save(); });
    }
    getValues() {
        var settings = new Communication.Settings();
        settings.guid = this.guid;
        settings.name = this.name.val();
        settings.gallery = this.select_gallery.find('option:selected').val();
        settings.select = parseInt(this.text_select.val());
        settings.password = this.text_password.val();
        settings.isLifetime = this.cb_lifetime.is(':checked');
        settings.lifetime = parseInt(this.text_lifetime.val());
        settings.isComments = this.cb_comments.is(':checked');
        settings.isFb = this.cb_fb.is(':checked');
        settings.isLifetime = this.cb_lifetime.is(':checked');
        settings.isPassword = this.cb_password.is(':checked');
        settings.isRatings = this.cb_ratings.is(':checked');
        settings.isWatermark = this.cb_watermark.is(':checked');
        settings.isSelect = this.cb_select.is(':checked');
        return settings;
    }
    checkValues() {
    }
    save() {
        var values = this.getValues();
        this.checkValues();
        var res = Communication.Comm.Send(values, false, Communication.URLCONST.SAVE, "html");
        if (res.status == Communication.Status.OK) {
            this.saveBtn.remove();
            this.settings_panel.find(".panel-footer").append(this.getRedirectLink());
        }
    }
    getRedirectLink() {
        var link = $("<label>Link to your gallery: &nbsp;</label><a href='" + document.location.origin + "/" + this.guid + "'>" + document.location.origin + "/" + this.guid + "</a>");
        return link;
    }
    addCheckboxOnChange(src, target) {
        src.on('change', function () {
            if (this.checked) {
                target.slideDown(500);
            }
            else {
                target.slideUp(500);
            }
        });
    }
}
//# sourceMappingURL=application.js.map