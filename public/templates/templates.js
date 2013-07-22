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