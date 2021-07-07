import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, action, set } from '@ember/object';

export default class UserCartController extends Controller {
  @service storage
  @service admin

  get userName() {
    return this.storage.lget("user_name")
  }

  get userAddress() {
    return this.storage.lget("user_attributes").address
  }

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
  async checkout() {
    await window.scrollTo(0,0)
    var modal = document.getElementById('modal');
			modal.style.display = "block";
    $("body").addClass('no-body-scroll')
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
      console.log(result)
      alert(result)
      // location.href = '/upload-proof'
    }).catch(e => {
      console.log(e)
    })
  }
}
