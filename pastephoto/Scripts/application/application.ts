﻿$(document).ready(function () {

    var app = new Application();

})

class Application {
    private settings_panel: JQuery = $("#settings-panel");
    private select_gallery: JQuery = $('#select-gallery');
    private name: JQuery = $('#text-name');
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
    private saveBtn: JQuery = $(".panel-footer button");
    private progress: JQuery = $("#progress");
    private guid: string = $('body').attr('id');
    constructor() {
        this.settings_panel.slideDown(500);
        this.addCheckboxOnChange(this.cb_password, this.text_password);
        this.addCheckboxOnChange(this.cb_lifetime, this.text_lifetime);
        this.addCheckboxOnChange(this.cb_select, this.text_select);
        this.saveBtn.click(()=> { this.save(); });
    }
    private getValues(): Communication.Settings {
        var settings = new Communication.Settings();
        settings.guid = this.guid;
        settings.name = this.name.val();
        settings.gallery = this.select_gallery.find('option:selected').val()
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
    private checkValues() {

    }
    private save() {
        var values = this.getValues();
        this.checkValues();
        var interval;
        if (values.isWatermark == true) {
            this.progress.parent().show();
            var move = 0;
            var moveby = 1;
            interval = setInterval(() => {
                this.progress.css("width", move + "%");
                move += moveby;
                if (move > 80) {
                    moveby = 0.1;
                }
            },200);
        }
        Communication.Comm.Send(values, true, Communication.URLCONST.SAVE, "html", (res) => {
            if (res.status == Communication.Status.OK) {
                this.saveBtn.remove();
                this.settings_panel.find(".panel-footer").append(this.getRedirectLink());
                this.progress.css("width", "100%");

                clearInterval(interval);
            }

        });
        
    }
    private getRedirectLink(): JQuery {
        var link = $("<label>Link to your gallery: &nbsp;</label><a href='" + document.location.origin + "/" + this.guid + "'>" + document.location.origin + "/" + this.guid +"</a>")
        return link;
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

