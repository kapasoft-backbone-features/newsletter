var NewsletterAppRouter = Backbone.Router.extend({
    routes: {
        "": "newsletter_form",
        "newsletter-subscribed": "post_newsletter_form"
    },

    initialize: function (){
        this.contentView = new NewsletterView({model: new NewsletterItem()});
    },

    newsletter_form: function () {
        $('#app-newsletter').html(this.contentView.render().el);
    },

    post_newsletter_form: function () {
        $('#app-newsletter').html('<div class="alert alert-success">Thank You for subscribing to our Newsletter</div>');
    }
});

var app = new NewsletterAppRouter();

$(function(){
    Backbone.history.start();
});