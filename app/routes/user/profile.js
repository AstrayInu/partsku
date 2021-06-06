import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class UserProfileRoute extends Route {
  @service admin
  @service storage
  beforeModel() {
    // this.headData.set('title', 'User Dashboard')

  }

  model() {
    return hash({
      account: this.admin.getUserData(this.storage.lget('user_id'))
    })
  }

  afterModel({ account }) {
    // if(account.type)
  }

  setupController(controller, { account }) { // params for setupC => controller, model
    console.log("==>", account)
    let attr = account.attributes
      , name
    if(attr.firstname && attr.lastname) name = `${attr.firstname} ${attr.lastname}`
    else if(attr.firstname && !attr.lastname) name = `${attr.firstname}`
    else if(!attr.firstname && attr.lastname) name = `${attr.lastname}`

    controller.set('uid', account.uid ? account.uid : this.storage.lget('user_id'))
    controller.set('name', name)
    controller.set('email', attr.email)
    controller.set('address', attr.address)
    controller.set('phoneNumber', attr.phone_number != 0 ? attr.phone_number : null )
    if(!name && !attr.email && !attr.address && !attr.phone_number) controller.set('incompleteData', true)
  }

  resetController(controller, isExiting, transition) {
    if(isExiting) {
      if(controller.get('incompleteData')) {
        alert('Please complete your data before surfing our catalog')
        transition.abort();
        location.reload()
      }
    }
  }
}
