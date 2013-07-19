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