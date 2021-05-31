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
  showPass() {
    if (this.showPassword) {
      set(this, 'showPassword', false)
      document.getElementById('password').type = 'password'
    } else {
      set(this, 'showPassword', true)
      document.getElementById('password').type = 'text'
    }
  }

  @action
  login() {
    let data = {
      email: this.email,
      password: this.password
    }
 console.log("==>",data)
    // fetch(`http://localhost:3000/users/login`, {
    //       method: 'POST',
    //       body: JSON.stringify(data),
    //       credential: 'include'
    //       // headers: {
    //       //   'X-TOKEN': xtoken
    //       // }
    //     }).then( response => {
    //       set(this, 'successMessage', response.msg)
    //       console.log("BERHASIL LOGIN", response)
    //       this.storage.lset('user_email', response.email)
    //       this.storage.lset('user_id', response.id)
    //       this.storage.lset('user_name', response.name)
    //       if(response.sid) this.storage.lset('seller_id', response.sid)
    
    //       this.transitionTo = 'user.profile'
    //     }).catch( e => {
    //       console.log("ERROR", e)
    //       // alert(e)
    //     })

    this.session.loginUser(data).then( res => {
      set(this, 'successMessage', res.msg)
      console.log("BERHASIL LOGIN", res)
      this.storage.lset('user_email', res.email)
      this.storage.lset('user_id', res.id)
      this.storage.lset('user_name', res.name)
      if(res.sid) this.storage.lset('seller_id', res.sid)

      this.transitionTo = 'user.profile'
    }).catch( e => {
      let err = e.msg ? e.msg : e
      set(this, 'errorMessage', err)
      console.log("ERROR", err)
    })
  }
}
