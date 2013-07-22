var NewsletterAppRouter = Backbone.Router.extend({
    routes: {
        "": "newsletter_form",
        "newsletter-subscribed": "post_newsletter_form"
    },

    initialize: function (){
        this.contentView = new NewsletterView({model: new NewsletterItem()});
    },

    newsletter_form: function () {
        $('#app-newsletter').html(this.contentView.render(this.clientConfig).el);
    },

    post_newsletter_form: function () {
        $('#app-newsletter').html('<div class="alert alert-success">' + this.clientConfig.message + '</div>');
    }
});

var app = new NewsletterAppRouter();
var NEWSLETTER = NEWSLETTER || {};
if(NEWSLETTER.message == undefined){
    NEWSLETTER.message = 'Thank You for subscribing to our Newsletter';
}
if(NEWSLETTER.button == undefined){
    NEWSLETTER.button = 'Subscribe';
}

app.clientConfig = NEWSLETTER;

$(function(){
    Backbone.history.start();
});