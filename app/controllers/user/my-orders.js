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

  @computed('timeLeft')
  get countdown() {
    var countDownDate = new Date(this.timeLeft).getTime();
    // console.log('countDownDate', countDownDate)

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is over, write some text
      if (distance < 0 || isNaN(distance)) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
        $("#input-proof").addClass("d-none")
      } else {
        // Output the result in an element with id="demo"
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
      }
    }, 1000);
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
    var imgs = document.getElementById("show-proof-img")
    imgs.src = val
  }

  @action
  setTID(val, time) {
    set(this, 'timeLeft', time)
    this.storage.sset("temp_TID", val)
  }

  @action
  inputFoto(val) {
    const file = val.target.files[0];
    let reader = new FileReader()

    var imgs = document.getElementById("preview-proof")
    imgs.src = URL.createObjectURL(file)

    if(file.type != 'image/jpeg' && file.type != 'image/png') {
      alert('Gambar harus berformat .jpg atau .png')
    } else {
      if(file) reader.readAsDataURL(file) // calls reader.onload if the file exists

      reader.onload = (e) => {
        let img64 = e.target.result

        this.storage.sset("proof", img64)
        set(this, 'uploaded', true)
      }
    }
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
