import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { match, notEmpty } from '@ember/object/computed';
import { computed, action, set } from '@ember/object';
import fetch from 'fetch'

export default class SellerRegisterController extends Controller {
  @service storage
  @service session
  @service admin

  isValidShopName = false

  @computed('isValidShopName', 'isValidWaNum', 'papKtp', 'papToko', 'tcChecked', 'isValidAddress')
  get isDisabled() {
    // console.log(!this.isValidShopName, !this.isValidWaNum, !this.papKtp, !this.papToko, !this.tcChecked, !this.isValidAddress)
    return !this.isValidShopName || !this.isValidWaNum || !this.papKtp || !this.papToko || !this.tcChecked || !this.isValidAddress
  }

  @action
  back() {
    location.href = '/'
  }

  @action
  inputShopName(val) {
    if(!val.match(/[a-zA-Z0-1&-]/g)) set(this, 'shopName', '')
    if(val.length > 5) set(this, 'isValidShopName', true)
  }

  @action
  inputWANum(val) {
    if(val.match(/[0-9]/g)) set(this, 'isValidWaNum', true);
    else set(this, 'waNum', '')
  }

  @action
  inputKTP(val) {
    // console.log('val', val)
    const file = val.target.files[0];
    let reader = new FileReader()

    if(file.type != 'image/jpeg' && file.type != 'image/png') {
      alert('Gambar harus berformat .jpg atau .png')
    } else {
      if(file) reader.readAsDataURL(file) // calls reader.onload if the file exists

      reader.onload = (e) => {
        let img64 = e.target.result

        set(this, 'papKtp', img64)
      }
    }
  }

  @action
  inputFotoToko(val) {
    // console.log('val', val)
    const file = val.target.files[0];
    let reader = new FileReader()

    if(file.type != 'image/jpeg' && file.type != 'image/png') {
      alert('Gambar harus berformat .jpg atau .png')
    } else {
      if(file) reader.readAsDataURL(file) // calls reader.onload if the file exists

      reader.onload = (e) => {
        let img64 = e.target.result

        set(this, 'papToko', img64)
      }
    }
  }

  @action
  checkTNC() {
    if (this.tcChecked) set(this, 'tcChecked', false)
    else set(this, 'tcChecked', true)
  }

  @action
  inputAddress(val) {
    if(val.length > 7) set(this, 'isValidAddress', true)
  }

  @action
  register() {
    let data = {
      shopName: this.shopName.trim(),
      waNum: this.waNum,
      papKtp: this.papKtp,
      papToko: this.papToko,
      shopAddress: $("#shop-address").val(),
      uid: this.storage.lget("user_id")
    }

    $('#reg-btn').addClass("d-none")
    $('#spinner').removeClass("d-none")

    this.admin.createSeller(data).then( response => {
      // console.log("BERHASIL", response)
      // this.storage.lset("seller_id", response.sid)
      // this.storage.lset("seller_data", response.data)
      // this.storage.lset("user_type", 'seller')
      
      // set(this, 'successMessage', 'Registrasi berhasil.')
      alert("Registration completed! Please wait for the admin to validate the data you've given")
      // $(".sreg-title").hide()
      // setTimeout( () => {
        // $(".sreg-title").show()
        location.href = '/'
      // }, 5000)
      
    }).catch( e => {
      alert("Error :(\npls contact our devs")
      $('#reg-btn').removeClass("d-none")
      $('#spinner').addClass("d-none")
      console.log('Error',e)
    })
  }

}
