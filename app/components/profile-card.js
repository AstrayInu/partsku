import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, action, set } from '@ember/object';
import fetch from 'fetch'
import $ from 'jquery'
import SellerProductsListController from '../controllers/seller/products-list';

export default class ProfileCardComponent extends Component {
  @service storage
  @service admin
  @service router

  get isSeller() {
    return this.storage.lget("seller_id")
  }

  didInsertElement() {
    let currRoute = this.router.currentRouteName
    if(currRoute === "user.profile") {
      $("#user-profile-tab").removeClass("font-weight-light")
      $("#user-orders-tab").addClass("font-weight-light")
      $("#seller-profile-tab").addClass("font-weight-light")
      $("#orders-tab").addClass("font-weight-light")
      $("#parts-tab").addClass("font-weight-light")
    }
    if(currRoute === 'user.my-orders') {
      $("#user-profile-tab").addClass("font-weight-light")
      $("#user-orders-tab").removeClass("font-weight-light")
      $("#seller-profile-tab").addClass("font-weight-light")
      $("#orders-tab").addClass("font-weight-light")
      $("#parts-tab").addClass("font-weight-light")
    }
    if(currRoute === 'seller.profile') {
      $("#user-profile-tab").addClass("font-weight-light")
      $("#user-orders-tab").addClass("font-weight-light")
      $("#seller-profile-tab").removeClass("font-weight-light")
      $("#orders-tab").addClass("font-weight-light")
      $("#parts-tab").addClass("font-weight-light")
    }
    if(currRoute === 'seller.transaction-list') {
      $("#user-profile-tab").addClass("font-weight-light")
      $("#user-orders-tab").addClass("font-weight-light")
      $("#seller-profile-tab").addClass("font-weight-light")
      $("#orders-tab").removeClass("font-weight-light")
      $("#parts-tab").addClass("font-weight-light")
    }
    if(currRoute === 'seller.products-list') {
      $("#user-profile-tab").addClass("font-weight-light")
      $("#user-orders-tab").addClass("font-weight-light")
      $("#seller-profile-tab").addClass("font-weight-light")
      $("#orders-tab").addClass("font-weight-light")
      $("#parts-tab").removeClass("font-weight-light")
    }
    if(currRoute == 'admin.seller-list') {
      $("#user-profile-tab").addClass("font-weight-light")
      $("#transaction-tab").addClass("font-weight-light")
      $("#seller-tab").removeClass("font-weight-light")
    }
    if(currRoute == 'admin.transaction-list') {
      $("#user-profile-tab").addClass("font-weight-light")
      $("#transaction-tab").removeClass("font-weight-light")
      $("#seller-tab").addClass("font-weight-light")
    }

    if(this.isSeller) {
      $("#my-order").removeClass("border-bottom-radius-10px")
    }
  }

  @computed('where')
  get userData() {
    if(this.where == "user") {
      this.admin.getUserData(this.storage.lget("user_id")).then(response => {
        this.storage.lset("user_pp", response.attributes.imgUrl)
        return response
      }).catch( e => {
        console.log(e)
      })
    } else {
      this.admin.getSellerData(this.storage.lget("seller_id")).then(response => {
        this.storage.lset("seller_data", response.data)
        return response
      }).catch( e => {
        console.log(e)
      })
    }
  }

  @computed('where')
  get imgUrl() {
    if(this.where == 'admin') return "https://res.cloudinary.com/partsku/image/upload/v1625020147/partsku/green_ranger_square_n2kcaw.jpg"
    let url = this.where == "user" || this.where == "user-orders" ? this.storage.lget("user_pp") : this.storage.lget("seller_data").attributes.logo
    return url ? url : "https://res.cloudinary.com/partsku/image/upload/v1624543471/partsku/default_pp_uc7fxq.png"
  }
}
