var NewsletterItem = Backbone.Model.extend({
    defaults: {
        email: '',
        type: 'newsletter'
    }
});
var NewsletterView = Backbone.View.extend({

    render: function(config){
        //hook to pass value in handlebars template
        Handlebars.registerHelper('buttontext', function() {
            return new Handlebars.SafeString(
                config.button
            );
        });

        this.$el.html(Handlebars.templates.newsletter());

        this.delegateEvents({//ensures DOM elements always get events they suppose to
            'click .newsletter-form .btn-primary': 'save'
        });
        return this;
    },

    save: function () {
        this.setModelData();//extract data and set in the model
        app.navigate('newsletter-subscribed',{trigger: true});
        socket.send(JSON.stringify(app.contentView.model.attributes));
    },

    setModelData: function  () {
        this.model.set({
            email: this.$el.find('.newsletter-form input[name="email"]').val(),
            website: window.location.hostname,
            id:null,//so that reusing this function, it gets its own unique id before going to server
            type:'postNewsletter'
        });
    }
});
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
