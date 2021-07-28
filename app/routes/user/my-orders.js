import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class UserMyOrdersRoute extends Route {
  @service admin
  @service storage

  async model() {
    let seller_data
    if(!this.storage.lget("seller_data") && this.storage.lget("user_type") != "user") {
      let sid = this.storage.lget("seller_id")
      seller_data = await this.admin.getSellerData(sid)
      
      this.storage.lset("seller_data", seller_data)
    } else {
      seller_data = this.storage.lget("seller_data")
    }
    return hash({ seller_data, orders: this.admin.getTransactions({uid: this.storage.lget("user_id")}) })
  }

  setupController(controller, { seller_data, orders }) {
    // console.log('orders', orders)
    controller.set("pending", orders.pending)
    controller.set("done", orders.done)
    controller.set("status", orders.status)
    controller.set("status_done", orders.status_done)
  }

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('shows', null);
    }
  }
}
