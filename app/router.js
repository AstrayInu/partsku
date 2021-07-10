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
    this.route("wishlist")
    this.route("cart")
    this.route('my-orders');

    this.route('orders', function() {
      this.route('detail');
    });
  })

  this.route("seller", function() {
    this.route("register")
    this.route("profile");
    this.route("product", function() {
      this.route("add");
      this.route("edit", { path: "/edit/:product_id"});
    });
    this.route('products-list');
    this.route('transaction-list');
  });

  this.route("catalog")
  this.route("product-detail", { path: "product-detail/:product_id"})

  this.route('admin', function() {
    this.route('seller-list');
    this.route('transaction-list');
  });
});
