import EmberRouter from '@ember/routing/router';
import config from 'partsku-ember/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route("login")
  this.route("register")

  this.route("user", function() {
    this.route("profile");
    this.route("changepass");
  })

  this.route("seller", function() {
    this.route("register")
    this.route("profile");
    this.route("product", function() {
      this.route("add");
      this.route("list");
      this.route("edit", { path: "/edit/:product_id"});
    });
  });


});
