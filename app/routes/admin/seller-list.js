import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class AdminSellerListRoute extends Route {
  @service admin
  @service storage

  beforeModel() {
    if(this.storage.lget("user_type") !== 'admin') {
      location.href = '/'
    }
  }

  async model() {
    let seller_list = await this.admin.getSellers({admin: 1})

    return hash({seller_list})
  }

  setupController(controller, { seller_list }) {
    // console.log(seller_list)
    controller.set("newSellers", seller_list.newSellers);
    controller.set("approvedSellers", seller_list.approved);
  }
}
