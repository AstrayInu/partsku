import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { action, set, computed } from '@ember/object';

export default class UserMyOrdersController extends Controller {
  @service admin
  @service storage

  @computed('shows')
  get shownData() {
    return this.shows == 'done' ? this.done : this.pending
  }

  @action
  changeView(val) {
    set(this, 'shows', val)
    if(this.shows == "unfinished") {
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
  showImg(val) {
    set(this, 'proofData', val)
  }

  @action
  rateProduct(data) {
    this.storage.sset("rateData", data)
  }

  @action
  async setTID(val, time) {
    await set(this, 'created_at', time)
    await set(this, 'uploadProofTID', val)
  }

  @action
  seeReview(rid) {
    this.admin.getReviewData({rid}).then(async res => {
      await set(this, 'reviewData', res.data[0])
    }).catch(e => {
      console.log(e)
      alert(e)
    })
  }

  @action
  changeTransStatus(val, tid, sid) {
    this.admin.setTransactionStatus({shipment_status: val, transaction_id: tid, sid}).then(result => {
      alert("Transaction Updated!")
      location.reload()
    }).catch(e => {
      console.log(e)
    })
  }

  @action
  upload() {
    let uploadData = {
      imgData: this.storage.sget("proof"),
      tid: this.storage.sget("temp_TID")
    }
    $("#upload-btn").addClass("d-none")
    $("#spinner").removeClass("d-none")
    this.admin.uploadProof(uploadData).then(result => {
      console.log(result)
      alert(result.msg)
      location.reload()
    }).catch(e => {
      console.log(e)
      alert("Something went wrong back there. Please try again later or contact our team")
    })
  }
}
