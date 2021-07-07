import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { match, notEmpty } from '@ember/object/computed';
import { computed, action, set } from '@ember/object';

export default class HeaderDesktopComponent extends Component {
  @service session
  @service storage
  @service router
  
  get isLoggedIn() {
    return this.session.isUserLoggedin
  }

  get notSeller() {
    if(this.storage.lget("user_type") === "admin") return false
    else return this.session.isUserLoggedin && !this.session.isSellerLoggedin
  }

  get showBar() {
    let currRoute = this.router.currentRouteName
    if(currRoute == "index") return false
    else return true
  }

  get wishRoute() {
    return this.isLoggedIn ? 'user.wishlist' : 'login'
  }

  get cartRoute() {
    return this.isLoggedIn ? 'user.cart' : 'login'
  }

  get userName() {
    return this.storage.lget("user_name")
  }
  
  get smallPp() {
    if(this.storage.lget("user_type") === "admin") return `https://res.cloudinary.com/partsku/image/upload/v1625020147/partsku/green_ranger_square_n2kcaw.jpg`
    else return this.storage.lget("user_pp") ? this.storage.lget("user_pp") : "https://res.cloudinary.com/partsku/image/upload/v1624543471/partsku/default_pp_uc7fxq.png"
  }

  didInsertElement() {
    if(this.isLoggedIn) $(".header-user-console").addClass("pl-0")
    else $(".header-user-console").removeClass("pl-0")
  }

  @action
  logout() {
    this.session.logoutUser(this.storage.lget("s_token"))
  }

  @action
  search() {
    let keyword = this.searchQuery
    this.router.transitionTo("catalog", {queryParams: {q: keyword, limit: 16, offset: 0}})
  }
}
