import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SellerProductAddRoute extends Route {
  @service storage

  async beforeModel() {
    // put login / seller validation here
    // let sellerData = await this.session.getSellerData()
    
    // if(!sellerData) {
    //   this.transitionTo('user.login')
    // }

    set(this, 'headData.title', 'Product Input')
  }

  model() {
    return { productData: {} }
  }

  setupController(controller, { productData }) {
    controller.set('productData', productData)
  }

}
