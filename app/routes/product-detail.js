import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProductDetailRoute extends Route {
  @service admin
  
  beforeModel() {

  }

  async model(params) {
    let pid = params.product_id
    console.log(pid)

    // let product_data = await this.admin.getProductData(pid)
    // return product_data
  }

  setupController(controller, model) {
    console.log(model)
  }
}
