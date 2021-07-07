import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class SellerProductsListRoute extends Route {
  @service admin
  @service storage

  beforeModel() {
    if(this.storage.lget("user_type") !== 'seller') {
      location.href = '/'
    }
  }

  async model() {
    if(this.storage.sget("tmpProductPics")) this.storage.sset("tmpProductPics", [])
    let sid = this.storage.lget("seller_id")
      , seller_data = await this.admin.getSellerData(sid)
      , product_list = await this.admin.getProducts({sid})
      , brand_list = await this.admin.getBrands()
      , category_list = await this.admin.getCategory()
      , products = product_list ? product_list : null

    this.storage.lset("seller_data", seller_data)
    return hash({products, brand_list, category_list, seller_data})
  }

  setupController(controller, { products, brand_list, category_list }) {
    console.log(products)
    controller.set('products', products.data)
    controller.set('brands', brand_list)
    controller.set('categories', category_list)
  }
}
