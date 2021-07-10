import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class UserMyOrdersRoute extends Route {
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
    return hash({ seller_data, orders: this.admin.getTransactions({uid: this.storage.lget("user_id")}) })
  }

  setupController(controller, { seller_data, orders }) {
    console.log('orders', orders)
    // orders.pending.forEach(x => {
    //   orders.sellerList.forEach(y => {
    //     if(x.pid == y.pid) {
    //       x.sid = y.sid
    //       x.pname = y.name
    //       x.shop_name = y.shop_name
    //       x.price = y.price
    //       x.img = y.imgUrl
    //     }
    //   })
    // })
    controller.set("orders", orders)
    controller.set("pending", orders.pending)
    controller.set("done", orders.done)
    controller.set("sellerList", orders.sellerList)
    controller.set("tidList", orders.tidList)
    controller.set("status", orders.status)
    controller.set("seller_data", seller_data)
  }
}
