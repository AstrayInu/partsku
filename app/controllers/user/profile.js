import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { action, set /*, get*/ } from '@ember/object';
import fetch from 'fetch'

export default class UserProfileController extends Controller {
  @service storage
  @service admin
  @service config

  get isSeller() {
    return this.storage.lget("seller_id")
  }

  get user_type() {
    let type = this.storage.lget("user_type")
    return type === 'admin' ? 'admin' : 'user'
  }

  @action
  inputName(val) {
    set(this, 'name', val)
  }

  @action
  inputEmail(val) {
    set(this, 'email', val)
  }

  @action
  inputPhone(val) {
    set(this, 'phoneNumber', val)
  }

  @action
  inputAddress(val) {
    set(this, 'address', val)
  }

  @action
  save() {
    let data = {
      name: this.name,
      email: this.email,
      phone_number: this.phoneNumber,
      address: this.address
    }
    // console.log(data)
    this.admin.saveUserData(data, this.storage.lget('user_id')).then( response => {
      // console.log("RESPONSE",response)
      let uattr = this.storage.lget("user_attributes")
      uattr.address = this.address
      this.storage.lset("user_attributes", uattr)
      this.storage.lset("user_name", this.name)
      this.storage.lset("user_email", this.email)
      this.storage.lset("user_phone", this.phoneNumber)
      alert(response.msg)
      location.reload();
    }).catch( e => {
      console.log(e)
      alert(e.err)
      set(this, 'errorMessage', e.err)
    })
  }

}
