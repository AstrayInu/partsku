import Service from '@ember/service';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import { Promise as EmberPromise } from 'rsvp';
import $ from 'jquery';

export default class SessionService extends Service {
  loginUser(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `localhost:3000/users/login`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }
}
