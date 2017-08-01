var app;
$(document).ready(function () {

    app = new BasicLightGallery();
    app.Render();
})

class BasicLightGallery {
    private images: Array<Communication.Image>;
    private options: Array<Options> = new Array();
    private settings: Communication.Settings;
    private showSelectedBtn: JQuery = $('#show-selected-btn');
    private countSelected: number = 0;
    public constructor() {
        this.images = JSON.parse($('#image-data').attr('data'));
        this.settings = JSON.parse($('#image-data').attr('settings'));
    }
    public GetSettings(): Communication.Settings {
        return this.settings;
    }
    public Render() {
        if (this.images == null)
            return;
        this.images.forEach((image, index) => {
            let o = new Options(image,this);
            this.options.push(o);
            o.Render();
        });
        if (this.settings.isSelect == true) {
            this.showSelectedBtn.show();
            this.onShowSelectedBtnClickEvent();
        }
    } 
    public AddSelectedCount() {
        this.countSelected++;
    }
    public MinusSelectedCount() {
        this.countSelected--;
    }
    public CheckIfCanAddSelect():boolean {
        if (this.settings.isSelect == true && this.settings.select != null) {
            if (this.countSelected < this.settings.select)
                return true;
            return false;
        }
        return false;
    }
    public GetImages() {
        return this.images;
    }
    private onShowSelectedBtnClickEvent() {
        this.showSelectedBtn.click(() => {
            if (this.showSelectedBtn.hasClass("btn-success")) {
                this.showSelectedBtn.removeClass("btn-success").addClass("btn-primary").text("show all images");
                this.options.forEach((value, index) => {
                    value.Hide();
                })
            }
            else
            {

                this.showSelectedBtn.removeClass("btn-primary").addClass("btn-success").text("show only selected");
                this.options.forEach((value, index) => {
                    value.Show();
                })
            }

            
        });
    } 
    public Update(image: Communication.Image) {
        Communication.Comm.Send(image, true, Communication.URLCONST.UPDATE, "html", null); 
    }
    public DownloadURL(url:string) {
        var hiddenIFrameID = 'hiddenDownloader';
        var iframe = document.getElementById(hiddenIFrameID);
        if (iframe === null) {
            iframe = document.createElement('iframe');
            iframe.id = hiddenIFrameID;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }
        $(iframe).attr('src', url);
    };
}

class Options {
    private image: Communication.Image = null;
    private parent: BasicLightGallery = null;
    private body: JQuery;
    private comment: JQuery;
    private select: JQuery;
    private ratting: JQuery;
    private download: JQuery;
    public constructor(image: Communication.Image, parent: BasicLightGallery) {
        this.image = image;
        this.parent = parent;
    }
    public Hide() {
        if (this.image.selected != 1) {
            this.body.parent().parent().hide();
        }
    }
    public Show() {
        this.body.parent().parent().show();
    }
    public Render() {
        let settings = this.parent.GetSettings();
        this.addBody();
        this.addDownload();
        if (settings.isSelect == true)
            this.addSelect();
        if (settings.isComments == true)
            this.addComment();
        if (settings.isRatings == true) {
            this.addRating();
        }
       
    }
    private addBody() {
        this.body = $('<ul class="nav nav-pills" role="tablist"></ul>');
        $('#' + this.image.id).append(this.body);
    }
    private addDownload() {
        this.download = $('<li role="presentation" style="float: right;"><a><span class="badge glyphicon glyphicon-download-alt" style="height: 22px;width: 27px;font-size: 14px;">&nbsp;</span></a></li>');
        this.body.append(this.download);
        this.onImageDownloadClickEvent(this.download);
    }
    private addSelect() {
        this.select = $('<li role= "presentation" style= "float: right;"><a><span class="badge glyphicon glyphicon-ok" style="height: 22px; width: 27px;">&nbsp;</span></a></li>');
        var badge = this.select.find('.badge.glyphicon-ok');
        if (this.image.selected == 1) {
           badge.addClass("clicked");
           this.parent.AddSelectedCount();
        }
        else {
            badge.removeClass("clicked");
        }
        this.onSelectClickEvent(badge);
        this.body.append(this.select);
        
    }
    private addComment() {
        this.comment = $('<li role= "presentation"> <a> Comments <span class="badge"> 0 </span></a> </li>');
        this.body.append(this.comment);
    }
    private addRating() {
        this.ratting = $('<li role= "presentation" style:"float:right"><div class="star-rating">' +
            '<span class="glyphicon glyphicon-star" data-rating="1"> </span>'+
            '<span class="glyphicon glyphicon-star" data-rating="2"> </span>'+
            '<span class="glyphicon glyphicon-star" data-rating="3"> </span>'+
            '<span class="glyphicon glyphicon-star" data-rating="4"> </span>'+
            '<span class="glyphicon glyphicon-star" data-rating="5"> </span>'+
            '</div></li>');
        this.body.append(this.ratting);
        var stars = this.ratting.find(".glyphicon");
        if (this.image.rate != null) {
            stars.each((index, star) => {
                if (parseInt($(star).attr("data-rating")) <= this.image.rate) {
                    $(star).addClass("star-picked")
                }
            })
        }
        this.onRatingMouseover(stars);
        this.onRatingClickEvent(stars);
    }
    private onImageDownloadClickEvent(el: JQuery) {
        el.click((e) => {
            var src = $(e.target).closest('img').attr('src');
            this.parent.DownloadURL(src);
        });
    }
    private onSelectClickEvent(el: JQuery) {
        el.click((e) => {
            if (el.hasClass("clicked")) {
                el.removeClass("clicked");
                this.image.selected = 0;
                this.parent.MinusSelectedCount();
            }
            else {
                
                if (this.parent.CheckIfCanAddSelect()) {
                    el.addClass("clicked");
                    this.image.selected = 1;
                    this.parent.AddSelectedCount();
                }
                else {
                    alert("Maximum selected images = " + this.parent.GetSettings().select);
                }
                
            }
            this.parent.Update(this.image);
        })
    }
    private onRatingMouseover(el: JQuery) {
        el.mouseover((e) => {
            el.removeClass("star-selected");
            var value = parseInt($(e.target).attr("data-rating"));
            var parent = $(e.target).parent();
            parent.children().each((index, star) => {
                if (parseInt($(star).attr("data-rating")) <= value) {
                    $(star).addClass("star-selected")
                }
            })
        })
        el.parent().mouseleave(() => {
            el.removeClass("star-selected");
        })
    }
    private onRatingClickEvent(el: JQuery) {
        el.click((e) => {
            el.removeClass("star-picked").removeClass("star-selected");
            var value = parseInt($(e.target).attr("data-rating"));
            this.image.rate = value;
            this.parent.Update(this.image);
            var parent = $(e.target).parent();
            parent.children().each((index, star) => {
                if (parseInt($(star).attr("data-rating")) <= value) {
                    $(star).addClass("star-picked")
                }
            })


        })
    }

}