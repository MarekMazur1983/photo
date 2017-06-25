$(document).ready(function () {
    var app = new Application();
});
class Application {
    constructor() {
        this.settings_panel = $("#settings-panel");
        this.select_gallery = $('#select-gallery');
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
        this.settings_panel.slideDown(500);
        this.addCheckboxOnChange(this.cb_password, this.text_password);
        this.addCheckboxOnChange(this.cb_lifetime, this.text_lifetime);
        this.addCheckboxOnChange(this.cb_select, this.text_select);
    }
    getValues() {
        var settings = new Settings();
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
    }
    addClickEvent(target, callback) {
        target.click(callback);
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
class Settings {
}
//# sourceMappingURL=application.js.map