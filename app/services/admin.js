
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
        url: `${this.config.appenv.API_ENDPOINT}/users/checkUser`,
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

  updateSellerData(data, sid) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'PUT',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/sellers/${sid}`,
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

  uploadUserPicture(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/users/profilePicture`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  saveUserData(data, id) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'PUT',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/users/${id}`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  getSellers(data) {
    // console.log(data)
    let urlname = `${this.config.appenv.API_ENDPOINT}/sellers`
    if(data.admin) urlname += `?admin=1`
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url: urlname
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

  approveSeller(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/sellers/approve-seller`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  getSellerData(sid) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/sellers/${sid}`
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  checkSellerStatus(uid) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/sellers/check-seller-status/${uid}`
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  uploadSellerPicture(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/sellers/profile-picture`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  getProducts(data) {
    let params = ''
    params += data.q ? `q=${data.q}&` : ''
    params += data.sort ? `sort=${data.sort}&` : ''
    params += data.brand ? `brand=${data.brand}&` : ''
    params += data.limit ? `limit=${data.limit}&` : ''
    params += data.offset ? `offset=${data.offset}&` : ''
    params += data.sid ? `sid=${data.sid}&` : ''
    params += data.category ? `category=${data.category}&` : ''
    // console.log("params", data)
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/products?${params}`
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }


  getProductData(pid) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/products/${pid}`
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  createProduct(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/products`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  editProduct(data, pid) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'PUT',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/products/${pid}`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  setProductActive(newStatus, pid) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'PUT',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/products/activate/${pid}?active=${newStatus}`,
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  deleteProduct(pid) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'DELETE',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/products/${pid}`,
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  addToCart(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/users/cart/add`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  getCartData(uid) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/users/cart/${uid}`
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  updateCart(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'PUT',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/users/cart/update`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  deleteCartItem(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'DELETE',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/users/cart/delete`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  newTransaction(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/commerce/transaction/new`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  getTransactions(data) {
    let url = `${this.config.appenv.API_ENDPOINT}/commerce/transaction`
    if(data.uid) url += `?uid=${data.uid}`
    if(data.tid) url += `?tid=${data.tid}`
    if(data.sid) url += `?sid=${data.sid}`
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url: url
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  setTransactionStatus(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'PUT',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/commerce/transaction/update`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  uploadProof(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'PUT',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/commerce/transaction/upload-proof`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  submitReview(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/products/rate-product`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  getReviewData(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/products/get-product-rating`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
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

  indexBrand = [
    {name: 'honda', imgUrl: 'https://res.cloudinary.com/partsku/image/upload/v1623222847/partsku/Honda-landing-logo_ndjwko.png'},
    {name: 'toyota', imgUrl: 'https://res.cloudinary.com/partsku/image/upload/v1623222847/partsku/Toyota-landing-logo.png_eksggx.png'},
    {name: 'mitsubishi', imgUrl: 'https://res.cloudinary.com/partsku/image/upload/v1623222848/partsku/Mitsubishi-landing-logo.png_vhz97w.png'},
    {name: 'mazda', imgUrl: 'https://res.cloudinary.com/partsku/image/upload/v1623222847/partsku/Mazda-landing-logo.png_tgexfj.png'},
    {name: 'nissan', imgUrl: 'https://res.cloudinary.com/partsku/image/upload/v1625294527/partsku/nissan-landing-logo_i2xznu.png'},
    {name: 'suzuki', imgUrl: 'https://res.cloudinary.com/partsku/image/upload/v1625294525/partsku/suzuki-landing-logo_b9it9t.png'},
    {name: 'volkswagen', imgUrl: 'https://res.cloudinary.com/partsku/image/upload/v1625294523/partsku/vw-landing-logo_kejspw.png'},
    {name: 'hyundai', imgUrl: 'https://res.cloudinary.com/partsku/image/upload/v1625294522/partsku/hyundai-landing-logo_xalxwi.png'},
    {name: 'mercedes-benz', imgUrl: 'https://res.cloudinary.com/partsku/image/upload/v1625294522/partsku/mercedes-landing-logo_z6w7o2.png'},
    {name: 'bmw', imgUrl: 'https://res.cloudinary.com/partsku/image/upload/v1625295672/partsku/bmw-landing-logo_w41zut.png'},
  ]

  getBrands() {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/public/get-brands`
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  getCategory() {
    return fetch(`${this.config.appenv.API_ENDPOINT}/public/get-category`, {
      method: 'GET',
    }).then( response => response.json())
    .catch( e => e.json())
  }


}