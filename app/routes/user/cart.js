import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp'

export default class UserCartRoute extends Route {
  @service admin
  @service storage

  async model() {
    let uid = this.storage.lget("user_id")
      , cartData = await this.admin.getCartData(uid)
    
    return hash({ cartData })
  }

  setupController(controller, { cartData }) {
    // console.log("CARTT",cartData)

    controller.set("cart", cartData)
    controller.set("cartSeller", cartData.seller)
    controller.set("cartData", cartData.data)
  }
}
