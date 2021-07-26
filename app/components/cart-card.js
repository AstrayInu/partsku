import Component from '@ember/component';
import { computed, action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CartCardComponent extends Component {
  @service admin
  @service storage

  get totalEach() {
    if(!this.buynow) {
      let result = 0
      this.data.forEach(x => {
        if(x.sid == this.seller.sid) {
          result = result + (x.price * x.quantity)
        }
      })
    }

    return this.buynow ? this.totalCart : result
  }

  get viewImg() {
    if(this.buynow) {
      return this.product.attributes.imgUrl[0]
    }
  }

  @computed('data')
  get estimateDate() {
    let now = new Date()
      , nowTime = now.toTimeString()
      , today = now.toDateString()
      , next = new Date(now.setDate(now.getDate() + 1))
      , twodays = new Date(now.setDate(now.getDate() + 2))
      , front

    today = today.split(" ")
    next = next.toDateString().split(" ")
    twodays = twodays.toDateString().split(" ")
    front = (nowTime.split(" ")[0].split(":")[0] >= 16) ? `${next[2]} ${next[1]}` : `${today[2]} ${today[1]}`

    return `${front} - ${twodays[2]} ${twodays[1]} ${twodays[3]}`
  }

  @action
  selectAllFromStore() {
    this.data.forEach(x => {
      if(x.sid == this.seller.sid) {
        if(!$(`#seller-${this.seller.sid}-checkbox`)[0].checked) $(`#check-seller-${x.sid}-item-${x.pid}`).attr("checked", false)
        else $(`#check-seller-${x.sid}-item-${x.pid}`).attr("checked", "checked")
      }
    })
  }

  @action
  min(val, idx, pid) {
    let q = Number(val) - 1
    // console.log("min", q, idx)
    $(`#qty_for_index_${idx}`).val(q)
    this.minQuant(q, pid)
  }

  @action
  add(val, idx, pid) {
    let q = Number(val) + 1
    // console.log("add", q, idx)
    // $(`#qty_for_index_${idx}`).val(q)
    this.addQuant(q, pid)
  }

  @action
  setQuant(idx, pid) {
    console.log(pid)
    let q = $(`#qty_for_index_${idx}`).val()
    if(!isNaN(Number(q))) {
      console.log(this.data)
      this.data.forEach(x => {
        if(x.pid == pid) x.quantity = q
      })
      console.log(this.data)
    } else {
      for(let x of this.data) {
        if(x.pid = pid) {
          console.log(x)
          $(`#qty_for_index_${idx}`).val(x.quantity)
        }
      }
    }
  }

  @action
  deleteItem(pid, uid) {
    // console.log(pid)
    this.admin.deleteCartItem({uid, pid}).then(res => {
      // console.log('res', res)
      alert(res)
      location.reload()
    }).catch(e => {
      // console.log(e)
      alert(e.responseJSON.err)
    })
  }
}