(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newsletter'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"newsletter-form\"  novalidate=\"\">\n            <input type=\"email\" value=\"\" name=\"email\" class=\"email\" placeholder=\"Your Email Adress Here ...\" required>\n            <button class=\"btn btn-primary\" name=\"submitButton\" type=\"submit\">Subscribe</button>\n</div>";
  });
})();