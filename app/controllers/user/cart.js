import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, action, set } from '@ember/object';

export default class UserCartController extends Controller {
  @service storage
  @service admin

  @computed('cartData')
  get productTotal() {
    let total = 0
    this.cartData.forEach(x => {
      total = total + x.quantity
    })
    return total
  }

  @computed('shippingPrice', 'cartData')
  get totalCart() {
    let total = 0
    this.cartData.forEach(x => {
      total = total + (x.quantity * x.price)
    })
    return total
  }

  @action
  setQuant(data) {
    set(this, 'cart.data', data)
    this.admin.updateCart(data).then(response => {
      // console.log('response', response)
    }).catch(e => {
      console.log('e', e)
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
    if(!this.storage.lget("user_attributes").address || !this.storage.lget("user_phone")) {
      alert("Please complete your data before checking out")
      location.href ='/user/profile'
    }
  }

  @action
  closeModal() {
    var modal = document.getElementById('modal');
    modal.style.display = "none";
    $("body").removeClass('no-body-scroll')
  }

  @action
  confirm() {
    let d = new Date()
      , time = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`
      , rand = Math.floor(Math.random()*69)
      , uid = this.storage.lget("user_id")
      , transaction_id = `TPKU${time}${rand}${uid}`
      , data = {
        uid,
        transaction_id,
        total_price: this.totalCart,
        cartData: this.cart
      }

    this.admin.newTransaction(data).then(result => {
      // console.log(result)
      alert(result)
      location.href = '/user/my-orders'
    }).catch(e => {
      console.log(e)
    })
  }
}
