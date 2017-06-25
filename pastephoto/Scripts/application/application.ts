$(document).ready(function () {

    var app = new Application();

})

class Application {
    private settings_panel: JQuery = $("#settings-panel");
    private select_gallery: JQuery = $('#select-gallery');
    private cb_password: JQuery = $("#cb-password");
    private text_password: JQuery = $('#text-password');
    private cb_lifetime: JQuery = $('#cb-lifetime');
    private text_lifetime: JQuery = $('#text-lifetime');
    private cb_watermark: JQuery = $('#cb-watermark');
    private cb_select: JQuery = $('#cb-select');
    private text_select: JQuery = $('#text-select');
    private cb_comments: JQuery = $('#cb-comments');
    private cb_ratings: JQuery = $('#cb-ratings');
    private cb_fb: JQuery = $('#cb-ratings');

    
    constructor() {
        this.settings_panel.slideDown(500);
        this.addCheckboxOnChange(this.cb_password, this.text_password);
        this.addCheckboxOnChange(this.cb_lifetime, this.text_lifetime);
        this.addCheckboxOnChange(this.cb_select, this.text_select);
    }


    private getValues() {
        var settings = new Settings();
        // settings.gallery = this.select_gallery;
        settings.isComments = this.cb_comments.is(':checked');
        settings.isFb = this.cb_fb.is(':checked');
        settings.isLifetime = this.cb_lifetime.is(':checked');
        settings.isPassword = this.cb_password.is(':checked');
        settings.isRatings = this.cb_ratings.is(':checked');
        settings.isWatermark = this.cb_watermark.is(':checked');
        settings.isSelect = this.cb_select.is(':checked');
       
    }

    private addClickEvent(target: JQuery, callback: Function): void{
        target.click(callback);
    }
    private addCheckboxOnChange(src: JQuery, target: JQuery): void {
        src.on('change', function () { 
            if (this.checked) 
            {
                target.slideDown(500);
            }
            else {
                target.slideUp(500);
            }
        })
    }

}

class Settings {
    public gallery: number;
    public isPassword: boolean;
    public isLifetime: boolean;
    public lifetime: number;
    public isWatermark: boolean;
    public isSelect: boolean;
    public select: number;
    public isComments: boolean;
    public isRatings: boolean;
    public isFb: boolean;
}