import Component from '@ember/component';
import { computed, action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProductCardComponent extends Component {
  @service admin

  get productPrice() {
    let price = String(this.product.price)
      , priceSliced = price.slice(0, 3)
      , final
    if(this.product.price >= 1000000000) {
      priceSliced = price.slice(0, 6)
      final =  `Rp. ${priceSliced}m`
    } else {
      final = `Rp. ${priceSliced}k`
    }
    return final
  }

  get formatedPrice() {
    return new Intl.NumberFormat('de-de').format(this.product.price)
  }

  @computed('data')
  get sellerAttributes() {
    let attr = JSON.parse(this.data.attributes)
    return attr
  }

  @computed('data')
  get shopLogo() {
    return this.sellerAttributes.logo ? this.sellerAttributes.logo : `https://res.cloudinary.com/partsku/image/upload/v1624543471/partsku/default_pp_uc7fxq.png`
  }

  @computed('data')
  get productImg() {
    return JSON.parse(this.product.attributes).imgUrl[0]
  }

  @action
  productUrl() {
    return `/product/${this.product.pid}`
  }

  @action
  accSeller(email) {
    this.admin.approveSeller({email, type: 1}).then(response => {
      alert(response.msg)
      location.reload();
    }).catch( e => {
      console.log(e)
      alert(e.responseJSON)
    })
  }

  @action
  rejectSeller(email) {
    this.admin.approveSeller({email, type: 2}).then(response => {
      alert(response.msg)
      location.reload();
    }).catch( e => {
      console.log(e.responseJSON)
    })
  }

  @action
  editSeller(sid) {

  }

  @action
  deleteSeller(sid) {
    
  }
}
