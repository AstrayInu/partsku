import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, action, set } from '@ember/object';

export default class UserCartController extends Controller {

  @computed('cartData')
  get productTotal() {
    let total = 0
    this.cartData.forEach(x => {
      total = total + x.quantity
    })
    return total 
  }

  get totalCart() {
    let total = 0
    this.cartData.forEach(x => {
      total = total + (x.quantity * x.price)
    })
    return total
  }

  @action
  minQuant(val, pid) {
    console.log("MIN", val)
    this.cartData.map(x => {
      if(x.pid == pid) x.quantity = val
    })
  }
  
  @action
  addQuant(val, pid) {
    console.log("MAX", val)
    this.cartData.map(x => {
      if(x.pid == pid) x.quantity = val
    })
  }

  @action
  selectAll() {
    this.cartSeller.forEach(x => {
      
    })
  }

  @action
  clear() {

  }

  @action
  checkout() {

  }
}
