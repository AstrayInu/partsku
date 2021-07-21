import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { match, notEmpty } from '@ember/object/computed';
import { computed, action, set } from '@ember/object';

export default class ModalPopupsComponent extends Component {
  @service admin
  @service storage

  @computed('time')
  get countdown() {
    var countDownDate = new Date(this.time).getTime();
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
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      }
    }, 1000);
  }

  @computed("data")
  get starRating() {
    if(this.data) {
      let rate = this.data.rate
      , ids = ['starhalf-static', 'star1-static', 'star1half-static', 'star2-static', 'star2half-static', 'star3-static', 'star3half-static', 'star4-static', 'star4half-static', 'star5-static']
      , count = rate / 0.5
      document.getElementById(`${ids[count-1]}`).checked = true
    }
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
  upload() {
    let uploadData = {
      imgData: this.storage.sget("proof"),
      tid: this.tid
    }
    // console.log('uploadData', uploadData)

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

  @action
  setRate(val) {
    set(this, 'rating', Number(val))
  }

  @action
  submitReview() {
    let rateData = this.storage.sget("rateData")
    let data = {
      rate: this.rating,
      review: $("#review-box").val(),
      pid: rateData.pid,
      sid: rateData.sid,
      uid: rateData.uid,
      tlog_id: rateData.id
    }
    // console.log(data)
    this.admin.submitReview(data).then(res => {
      alert("Review submitted")
      location.reload()
    }).catch(e => {
      console.log("ERROR", e)
      alert("ERROR")
    })
  }
}