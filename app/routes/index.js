import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp'

export default class IndexRoute extends Route {
  @service admin

  model() {
    return  hash({newItems: this.admin.getProducts({sort: 'new', limit: 5})})
  }

  setupController(controller, { newItems }) {
    // console.log('newItems', newItems)
    newItems.data.forEach(x => {
      x.imgUrl = x.attributes.imgUrl[0]
      delete x.attributes
    })
    controller.set('thing', newItems.data.slice(1))
    controller.set('thing1', newItems.data[0])
  }
}
