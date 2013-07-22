(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newsletter'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"newsletter-form\"  novalidate=\"\">\n            <input type=\"email\" value=\"\" name=\"email\" class=\"email\" placeholder=\"Your Email Address Here ...\" required>\n            <button class=\"btn btn-primary\" name=\"submitButton\" type=\"submit\">";
  if (stack1 = helpers.buttontext) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.buttontext; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</button>\n</div>";
  return buffer;
  });
})();
(function($,NEWSLETTER){var NewsletterItem = Backbone.Model.extend({
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
})(jQuery,NEWSLETTER); 
