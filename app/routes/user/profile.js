import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class UserProfileRoute extends Route {
  beforeModel() {
    // this.headData.set('title', 'User Dashboard')

  }

  model() {
    return hash({
      account: this.admin.getUserData(this.storage.lget('user_id'))
    })
  }

  afterModel() {

  }

  setupController() {

  }
}
