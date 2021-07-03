import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { match, notEmpty } from '@ember/object/computed';
import { computed, action, set } from '@ember/object';
import fetch from 'fetch'

export default class LoginController extends Controller {
  @service storage
  @service session
  @service admin

  @notEmpty('password')
  isValidPassword

  // @match('email', /^08[0-9]{8,11}$|[^\s@]+@[^\s@]+\.[^\s@]+$/) // added phone number validation, for future use
  @match('email', /[^\s@]+@[^\s@]+\.[^\s@]+$/)
  isValidEmail

  @computed('isValidEmail', 'isValidPassword') // add capthca later, perhaps
  get isDisabled() {
    return !this.isValidEmail || !this.isValidPassword
  }

  @action
  back() {
    location.href = '/'
  }

  @action
  showPass() {
    if (this.showPassword) {
      set(this, 'showPassword', false)
      document.getElementById('hide-pass').style.display = ''
      document.getElementById('show-pass').style.display = 'none'
      document.getElementById('password').type = 'password'
    } else {
      set(this, 'showPassword', true)
      document.getElementById('hide-pass').style.display = 'none'
      document.getElementById('show-pass').style.display = ''
      document.getElementById('password').type = 'text'
    }
  }

  @action
  login() {
    let data = {
      email: this.email,
      password: this.password
    }

    this.session.loginUser(data).then( res => {
      set(this, 'successMessage', res.msg)
      console.log("BERHASIL LOGIN", res)
      this.storage.lset('user_email', res.email)
      this.storage.lset('user_id', res.id)
      this.storage.lset('user_name', res.name)
      this.storage.lset('user_attributes', res.attributes)
      this.storage.lset('user_pp', res.attributes.imgUrl)
      this.storage.lset('s_token', res.token)
      if(res.sid) this.storage.lset('seller_id', res.sid)
      if(res.type) this.storage.lset("user_type", res.type)
      
      if(!res.phone_number || !res.attributes.address) location.href = 'user/profile' // data not complete
      else location.href = '/'
    }).catch( e => {
      let err = e.responseJSON.msg ? e.responseJSON.msg : e
      set(this, 'errorMessage', err)
      console.log("ERROR", err)
    })
  }
}
