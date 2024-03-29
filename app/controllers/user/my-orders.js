import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { action, set, computed } from '@ember/object';

export default class UserMyOrdersController extends Controller {
  @service admin
  @service storage

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
  setTID(val) {
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
