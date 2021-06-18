
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import { Promise as EmberPromise } from 'rsvp';
import $ from 'jquery';


export default class AdminService extends Service {
  @service storage
  @service config

  checkUser(email) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/users/check`,
        data: JSON.stringify(email)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  createUser(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/users`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }
  
  getUserData(id) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/users/${id}`
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  createSeller(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/sellers`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  getProductData(pid) {
    return fetch(`${this.config.appenv.API_ENDPOINT}/products/${pid}`, {
      method: 'GET',
    }).then( response => response.json())
    .catch( e => e.json())
  }


  base64toBlob(data) {
    var byteString = atob(data.split(',')[1]);
    var mimeString = data.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var dw = new DataView(ab);

    for(var i = 0; i < byteString.length; i++) {
        dw.setUint8(i, byteString.charCodeAt(i));
    }

    return new Blob([ab], {type: mimeString});
  }

  pellOption = {
    actions: ['bold', 'italic', 'underline', 'strikethrough', 'heading1', 'heading2', 'paragraph', 'olist', 'ulist', 'line']
  }

  itemConditions = [
    { key: '', value: '', msg: 'Choose Item Condition'},
    { key: '1', value: 'bnib', msg: 'Brand New In Box (BNIB)'},
    { key: '2', value: 'bnob', msg: 'Brand New Open Box (BNoB)'},
    { key: '3', value: 'used', msg: 'Used'}
  ]

  brands = [
    { key: '', name: 'Toyota', }
  ]


}