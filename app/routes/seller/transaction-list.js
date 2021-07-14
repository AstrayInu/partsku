import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class SellerTransactionListRoute extends Route {
  @service admin
  @service storage

  async model() {
    let seller_data
    if(!this.storage.lget("seller_data")) {
      let sid = this.storage.lget("seller_id")
      seller_data = await this.admin.getSellerData(sid)

      this.storage.lset("seller_data", seller_data)
    } else {
      seller_data = this.storage.lget("seller_data")
    }
    return hash({ seller_data, orders: this.admin.getTransactions({sid: this.storage.lget("seller_id")}) })
  }

  setupController(controller, { seller_data, orders }) {
    // console.log('orders', orders)
    controller.set("pending", orders.pending)
    controller.set("done", orders.done)
  }

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('shows', null);
    }
  }
}