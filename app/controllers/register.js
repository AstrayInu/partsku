import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { match, notEmpty } from '@ember/object/computed';
import { computed, action, set } from '@ember/object';
import fetch from 'fetch'

export default class RegisterController extends Controller {
  @service storage
  @service session
  @service admin

  tcChecked = false

  @notEmpty('password')
  isValidPassword

  // @match('email', /^08[0-9]{8,11}$|[^\s@]+@[^\s@]+\.[^\s@]+$/)
  @match('email', /[^\s@]+@[^\s@]+\.[^\s@]+$/)
  isValidEmail

  @computed('isValidEmail', 'isValidPassword', 'tcChecked') // add capthca later, perhaps
  get isDisabled() {
    return !this.isValidEmail || !this.isValidPassword || !this.tcChecked
  }

  @action
  back() {
    location.href = '/'
  }

  @action
  checkTNC() {
    if (this.tcChecked) set(this, 'tcChecked', false)
    else set(this, 'tcChecked', true)
  }

  @action
  register() {
    if(this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
      set(this, 'errorMessage', null)
      set(this, 'successMessage', null)
      let data = {
        email: this.email,
        pass: this.password
      }

      this.admin.checkUser(this.email).then(res => {
        // if user already exist
        set(this, 'errorMessage', 'Maaf, Email yang anda gunakan tidak valid / sudah terdaftar')
      }).catch(e => {
        this.createuser(data)
      })
    } else {
      set(this, 'errorMessage', 'Password minimal 8 karakter & 1 huruf besar & 1 huruf kecil & 1 angka')
    }
  }
  
  createuser(data) {
    this.admin.createUser(data).then( response => {
      set(this, 'successMessage', response.msg)
      setTimeout(() => {
        // this.transitionToRoute('login');
        location.href = '/login'
      }, 3000)
    }).catch(e => {
      // setTimeout(() => {
      //   location.reload();
      // }, 1500)
      set(this, 'errorMessage', 'Terjadi error, silahkan coba lagi')
      console.log("ERROR CREATE",e)
      // set(this, 'errorMessage', e.msg)
    })
  }
}
