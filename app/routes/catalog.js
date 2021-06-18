import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { set } from '@ember/object';

export default class CatalogRoute extends Route {
  @service commerce
  
  constructor() {
    super(...arguments)

    this.queryParams = {
      q: { refreshModel: true },
      limit: { refreshModel: true },
      offset: { refreshModel: true },
      sort: { refreshModel: true }
    }
  }

  model(params) {
    let query = {
      q: params.q,
      limit: params.limit ? params.limit : 24,
      offset: params.offset,
    }
    console.log(params)
    return hash({
      // catalogs: this.commerce.getProducts(query).then(results => {
      //   console.log(results)
      //   // return { data: results.toArray(), total: results.meta.total }
      // }),
      query,
      params
    })
  }

  setupController(controller, { /*catalogs,*/ query, params }) {
    // controller.set('data', catalogs)
    controller.set('data', {pid: 1234, name: 'T36 Turbo', price: 3999000})
    controller.set('query', query)
    controller.set('params', params)
  }

}
