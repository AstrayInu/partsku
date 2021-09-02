import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, set } from '@ember/object';
import fetch from 'fetch';
import { Promise as EmberPromise } from 'rsvp';
import $ from 'jquery';

export default class SessionService extends Service {
  @service config
  @service storage

  defaultPPic = `https://res.cloudinary.com/partsku/image/upload/v1624543471/partsku/default_pp_uc7fxq.png`

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

  async logoutUser(data) {
    // fetch(`${this.config.appenv.API_ENDPOINT}/users/logout`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // }).then(response => {
    //   console.log(response)
    //   if(response.err) alert(response.err)
    //   else {
        await this.storage.lremove("s_token")
        await this.storage.lremove("seller_data")
        await this.storage.lremove("seller_id")
        await this.storage.lremove("user_id")
        await this.storage.lremove("user_name")
        await this.storage.lremove("user_pp")
        await this.storage.lremove("user_type")
        await this.storage.lremove("user_address")
        await this.storage.lremove("user_email")
        await this.storage.lremove("user_phone")
        await this.storage.lremove("user_attributes")

        await this.storage.sremove("proof")
        
        alert("Logout Success!")
        location.href = '/'
    //   }
    // }).catch(e => {
    //   console.log(e)
      
    // })
  }
}
