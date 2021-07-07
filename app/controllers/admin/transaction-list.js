import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { action, set, computed } from '@ember/object';

export default class AdminTransactionListController extends Controller {
  @service admin
  @service storage

  
  @action
  changeView(val) {
    set(this, 'shows', val)
    if(this.shows == "new") {
      $("#new-btn").removeClass("btn-transparent")
      $("#new-btn").addClass("btn-red-border-radius")
      $("#appr-btn").addClass("btn-transparent")
      $("#appr-btn").removeClass("btn-red-border-radius")
    } else {
      $("#new-btn").addClass("btn-transparent")
      $("#new-btn").removeClass("btn-red-border-radius")
      $("#appr-btn").removeClass("btn-transparent")
      $("#appr-btn").addClass("btn-red-border-radius")
    }
  }

  @action
  changeTransStatus(val, tid) {
    this.admin.setTransactionStatus({approval: val, transaction_id: tid}).then(result => {
      alert("Transaction Updated!")
      location.reload()
    }).catch(e => {
      console.log(e)
    })
  }

  @action
  showImg(url) {
    var imgs = document.getElementById("show-proof-img")
    imgs.src = url;
  }
}
