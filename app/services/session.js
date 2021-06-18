import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, set } from '@ember/object';
import fetch from 'fetch';
import { Promise as EmberPromise } from 'rsvp';
import $ from 'jquery';

export default class SessionService extends Service {
  @service config
  @service storage

  @computed()
  get currentUser() {
    return this.storage.lget("user_id")
  }

  @computed()
  get currentSeller() {
    return this.storage.lget("seller_id")
  }

  @computed('currentUser')
  get isUserLoggedin() {
    return (this.currentUser && this.storage.lget("s_token")) ? true : false
  }

  @computed('currentSeller')
  get isSellerLoggedin() {
    return this.currentSeller
  }

  isSeller() {
    
  }

  loginUser(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/users/login`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  logoutUser(data) {
    return fetch(`${this.config.appenv.API_ENDPOINT}`)
  }
}
