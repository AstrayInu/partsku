import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProductDetailRoute extends Route {
  @service admin

  async model(params) {
    let pid = params.product_id
    // console.log(pid)

    let product_data = await this.admin.getProductData(pid)
    return product_data
  }

  setupController(controller, model) {
    // console.log("==>", model)
    controller.set("product", model.product)
    controller.set("productAttr", model.product.attributes)
    controller.set("seller", model.seller)
    controller.set("sellerAttr", model.seller.attributes)
  }
}
