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
      limit: { refreshModel: true },
      offset: { refreshModel: true },
      sort: { refreshModel: true }
    }
  }

  model(params) {
    let query = {
      q: params.q,
      limit: params.limit ? params.limit : 16,
      offset: params.offset ? params.offset : 0,
    }
    console.log("params", query)

    // let dummy = {
    //     imgUrl: 'https://res.cloudinary.com/partsku/image/upload/v1623229275/partsku/dummy-product_vfxcoy.png',
    //     name: 'AutoMeter 35054 Fan Motor - Direct Fit, Sold individually',
    //     price: 69000000,
    //     sku: '11141-69G03-000',
    //     pid: 1234
    //   }
    //   , dummy_container = []
      
    // for(let i=0;i<17;i++) dummy_container.push(dummy)

    return hash({
      catalogs: this.admin.getProducts(query).then(results => {
        console.log(results)
        return { data: results.data, total: results.count }
      }),
      // catalogs: {data: dummy_container, total: dummy_container.length},
      query,
      params
    })
  }

  setupController(controller, { catalogs, query, params }) {
    controller.set('data', catalogs)
    controller.set('query', query)
    controller.set('params', params)
  }

}
