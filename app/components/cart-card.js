import Component from '@ember/component';
import { computed, action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CartCardComponent extends Component {
  @service admin
  @service storage

  get totalEach() {
    let result = 0
     this.data.forEach(x => {
      if(x.sid == this.seller.sid) {
        result = result + (x.price * x.quantity)
      }
    })

    return result
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