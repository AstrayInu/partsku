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

  @match('firstName', /\w|\s/)
  isValidFName

  @match('lastName', /\w|\s/)
  isValidLName

  // @match('email', /^08[0-9]{8,11}$|[^\s@]+@[^\s@]+\.[^\s@]+$/)
  @match('email', /[^\s@]+@[^\s@]+\.[^\s@]+$/)
  isValidEmail

  @computed('isValidFName', 'isValidLName', 'isValidEmail', 'isValidPassword', 'tcChecked') // add capthca later, perhaps
  get isDisabled() {
    return !this.isValidFName || !this.isValidLName || !this.isValidEmail || !this.isValidPassword || !this.tcChecked
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
        fname: this.firstName,
        lname: this.lastName,
        email: this.email,
        pass: this.password
      }

      // this.admin.checkUser(this.email).then(res => {
      //   // if user already exist
      //   set(this, 'errorMessage', 'Maaf, Email yang anda gunakan tidak valid / sudah terdaftar')
      // }).catch(e => {
        this.createuser(data)
      // })
    // } else {
    //   set(this, 'errorMessage', 'Password minimal 8 karakter & 1 huruf besar & 1 huruf kecil & 1 angka')
    } else {
      set(this, 'errorMessage', 'Password must contain at least 1 Capital letter, 1 small case letter and 1 number')
    }
  }

  createuser(data) {
    $("#reg-btn").addClass("d-none")
    $("#spinner").removeClass("d-none")
    this.admin.createUser(data).then( async response => {
      set(this, 'successMessage', response.msg)
      await setTimeout(() => {
        // this.transitionToRoute('login');
        location.href = '/login'
      }, 3000)
    }).catch(e => {
      $("#reg-btn").removeClass("d-none")
      $("#spinner").addClass("d-none")
      // setTimeout(() => {
      //   location.reload();
      // }, 1500)
      set(this, 'errorMessage', 'Terjadi error, silahkan coba lagi')
      console.log("ERROR CREATE",e)
      // set(this, 'errorMessage', e.msg)
    })
  }
}
