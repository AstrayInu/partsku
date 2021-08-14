import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, action, set } from '@ember/object';

export default class SellerProfileController extends Controller {
  @service storage
  @service admin

  @computed('seller')
  get shopName() {
    return this.seller.attributes.shop_name
  }

  @computed('seller')
  get ktp() {
    return this.seller.attributes.ktpNum
  }

  @computed('seller')
  get shopAddress() {
    return this.seller.attributes.address
  }

  @action
  setWAnum(val) {
    if(val.match(/[0-9]/g)) set(this, 'waNum', val)
    else set(this, 'waNum', '')
  }

  @action
  save() {
    let data = {
      waNum: this.waNum,
      shopAddress: $("#shop-address").val(),
      sid: this.storage.lget("seller_id")
    }
    // console.log('data', data)

    this.admin.updateSellerData(data, this.storage.lget("seller_id")).then(res => {
      // console.log('res', res)
      alert("Update profile success")
      location.reload()
    }).catch(e => {
      console.log('e', e)
      alert("Error :(")
    })
  }
}
