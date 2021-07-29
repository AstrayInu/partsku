import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProductDetailRoute extends Route {
  @service admin
  @service storage
  @service session

  async model(params) {
    let pid = params.product_id
    // console.log(pid)

    let product_data = await this.admin.getProductData(pid)
      , product_rating = await this.admin.getReviewData({pid})
      , avg = 0
    product_rating.data.forEach(x => {
      avg = avg + Number(x.rate)
    });
    avg = avg / product_rating.count
    avg = isNaN(avg) ? 0 : avg
    if(!this.session.isUserLoggedin) this.storage.sset("previousProduct", product_data.product.pid)
    return hash({product_data, product_rating, avg})
  }

  setupController(controller, {product_data, product_rating, avg}) {
    // console.log("==>", product_data)
    controller.set("product", product_data.product)
    controller.set("productAttr", product_data.product.attributes)
    controller.set("seller", product_data.seller)
    controller.set("sellerAttr", product_data.seller.attributes)
    controller.set("product_rating", product_rating)
    controller.set("ratingCount", product_rating.count)
    controller.set("avg", avg)
  }
}
