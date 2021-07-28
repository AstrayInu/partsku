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

  @computed('time')
  get countdown() {
    let time1 = new Date(this.time);
    let addHour = time1.setDate(time1.getDate() + 1) + (7*60*60*1000) //server saved time in UTC, so we add +7
    var countDownDate = new Date(addHour)

    // console.log('time', this.time)
    // console.log('countDownDate', countDownDate)
    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0 || isNaN(distance)) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
        $("#input-proof").addClass("d-none")
      } else {
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        $("#input-proof").removeClass("d-none")
      }
    }, 1000);

    return x
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
  setTID(val, time) {
    clearInterval(this.countdown)
    set(this, 'time', time)
    set(this, 'uploadProofTID', val)
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
      // console.log(result)
      alert(result.msg)
      location.reload()
    }).catch(e => {
      console.log(e)
      alert("Something went wrong back there. Please try again later or contact our team")
    })
  }
}
