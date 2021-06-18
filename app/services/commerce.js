import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, set } from '@ember/object';
import fetch from 'fetch';
import { Promise as EmberPromise } from 'rsvp';
import $ from 'jquery';

export default class CommerceService extends Service {
  @service config

  getProducts(query) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/products`,
        data: JSON.stringify(query)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }
}
