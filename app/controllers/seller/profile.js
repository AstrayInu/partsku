import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, action, set } from '@ember/object';

export default class SellerProfileController extends Controller {
  @computed('seller')
  get shopName() {
    return this.seller.attributes.shop_name
  }

  @computed('seller')
  get email() {
    return this.seller.email
  }

  @computed('seller')
  get activeWA() {
    return this.seller.attributes.waNum
  }

  @computed('seller')
  get shopAddress() {
    return this.seller.attributes.address
  }

  @action
  save() {
    let data = {
      
    }
  }
}
