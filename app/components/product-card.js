import Component from '@ember/component';
import { computed, action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProductCardComponent extends Component {

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

  @action
  productUrl() {
    return `/product/${this.product.pid}`
  }
}
