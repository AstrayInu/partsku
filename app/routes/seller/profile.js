import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class SellerProfileRoute extends Route {
  @service admin
  @service storage

  beforeModel() {
    if(this.storage.lget("user_type") !== 'seller') {
      location.href = '/'
    }
  }

  async model() {
    // if(!this.storage.lget("seller_data")) {
      let sid = this.storage.lget("seller_id")
        , seller_data = await this.admin.getSellerData(sid)
      
        this.storage.lset("seller_data", seller_data)
      return hash({seller_data})
    // } else {
    //   return {seller_data: this.storage.lget("seller_data")}
    // }
  }

  setupController(controller, { seller_data }) {
    controller.set("seller", seller_data)
  }
}
