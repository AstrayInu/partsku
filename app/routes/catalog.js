import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { set } from '@ember/object';

export default class CatalogRoute extends Route {
  @service admin
  
  constructor() {
    super(...arguments)

    this.queryParams = {
      q: { refreshModel: true },
      brand: { refreshModel: true },
      limit: { refreshModel: true },
      offset: { refreshModel: true },
      sort: { refreshModel: true }
    }
  }

  model(params) {
    let query = {
      q: params.q,
      brand: params.brand,
      limit: params.limit ? params.limit : 16,
      offset: params.offset ? params.offset : 0,
    }
    // console.log("params", params)

    return hash({
      catalogs: this.admin.getProducts(query).then(results => {
        // console.log(results)
        return { data: results.data, total: results.count }
      }),
      brand_list: this.admin.getBrands(),
      category_list : this.admin.getCategory(),
      query,
      params
    })
  }

  setupController(controller, { catalogs, brand_list, category_list, query, params }) {
    controller.set('data', catalogs)
    controller.set('brands', brand_list)
    controller.set('categories', category_list)
    controller.set('query', query)
    controller.set('params', params)
  }

}
