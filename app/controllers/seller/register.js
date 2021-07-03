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

  @computed('isValidShopName', 'isValidWaNum', 'tcChecked', 'isValidAddress')
  get isDisabled() {
    console.log(!this.isValidShopName, !this.isValidWaNum, !this.tcChecked, !this.isValidAddress)
    return !this.isValidShopName || !this.isValidWaNum || !this.tcChecked || !this.isValidAddress
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
      shopAddress: $("#shop-address").val(),
      uid: this.storage.lget("user_id")
    }

    // console.log(data)

    this.admin.createSeller(data).then( response => {
      // console.log("BERHASIL", response)
      this.storage.lset("seller_id", response.sid)
      this.storage.lset("seller_data", response.data)
      this.storage.lset("user_type", 'seller')
      
      set(this, 'successMessage', 'Registrasi berhasil')
      $(".sreg-title").hide()
      setTimeout( () => {
        $(".sreg-title").show()
        location.href = '/seller/profile'
      }, 5000)
      
    }).catch( e => {
      console.log('Error',e)
    })
  }

}
