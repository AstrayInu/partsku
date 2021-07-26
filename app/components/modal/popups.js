import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { match, notEmpty } from '@ember/object/computed';
import { computed, action, set } from '@ember/object';

export default class ModalPopupsComponent extends Component {
  @service admin
  @service storage

  get userName() {
    return this.storage.lget("user_name")
  }

  get userAddress() {
    return this.storage.lget("user_attributes").address
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

  @computed("cartData", "cartSeller", "quantity")
  get buyData() {
    if(this.buynow) {
      let data = {
        pid: this.cartData.pid,
        sid: this.cartSeller.sid,
        quantity: this.quantity
      }

      return data
    }
  }

  @action
  closeModal() {
    set(this, 'time', null)
  }

  @action
  inputFoto(val) {
    const file = val.target.files[0];
    let reader = new FileReader()

    $("#preview-proof").removeClass("d-none")
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
      // console.log(result)
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
          cartData: this.buynow ? this.buyData : this.cart
        }
    if(this.buynow) data.buynow = true
    // console.log(data)
    this.admin.newTransaction(data).then(result => {
      // console.log(result)
      alert(result)
      location.href = '/user/my-orders'
    }).catch(e => {
      console.log(e)
    })
  }
}