import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class SellerProfileRoute extends Route {
  @service admin
  @service storage

  async model() {
    let sid = this.storage.lget("seller_id")
      , seller_data = await this.admin.getSellerData(sid)
    
      this.storage.lset("seller_data", seller_data)
    return hash({seller_data})
  }

  setupController(controller, { seller_data }) {
    controller.set("seller", seller_data)
  }
}
