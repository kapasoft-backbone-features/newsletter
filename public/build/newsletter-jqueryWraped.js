(function($){var NewsletterItem = Backbone.Model.extend({
    defaults: {
        email: '',
        type: 'newsletter'
    }
});
var NewsletterView = Backbone.View.extend({

    render: function(){
        this.$el.html(Handlebars.templates.newsletter());

        this.delegateEvents({//ensures DOM elements always get events they suppose to
            'click .newsletter-form .btn-primary': 'save'
        });
        return this;
    },

    save: function () {
        this.setModelData();//extract data and set in the model
        console.log(this.model.website);
        app.navigate('newsletter-subscribed',{trigger: true});
        socket.send(JSON.stringify(app.contentView.model.attributes));
    },

    setModelData: function  () {
        this.model.set({
            email: this.$el.find('.newsletter-form input[name="email"]').val(),
            website: window.location.pathname,
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
})(jQuery); 
