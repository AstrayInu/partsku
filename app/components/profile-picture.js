import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { computed, action, set } from '@ember/object';

export default class ProfileCardComponent extends Component {
  @service admin
  @service storage
  @service config

  @action
  uploadPP(event) {
    const file = event.target.files[0];
    let formData = new FormData();
    let reader = new FileReader()
    let api = this.where == "user" ? "users" : "sellers"
    // show img
    var imgs = document.getElementById("card-pp")
    imgs.src = URL.createObjectURL(file)

    if(file.type != 'image/jpeg' && file.type != 'image/png') {
      alert('Gambar harus berformat .jpg atau .png')
    } else {
      if(file) reader.readAsDataURL(file) // calls reader.onload if the file exists

      reader.onload = (e) => {
        let img64 = e.target.result
          , uploadData = {
            imgData: img64,
            uid: this.storage.lget("user_id")
          }

        if(this.where == "user" || this.where == "user-orders") {
          this.admin.uploadUserPicture(uploadData).then(response => {
            // console.log("ADMIN response", response)
            this.storage.lset("user_pp", response.url)
            location.reload();
          }).catch(e => {
            console.log("ADMIN ERROR",e)
          })
        } else {
          this.admin.uploadSellerPicture(uploadData).then(response => {
            // console.log("ADMIN response", response)
            this.storage.lset("seller_pp", response.url)
            alert(response.msg)
            location.reload();
          }).catch(e => {
            alert(e.responseText)
            console.log("ADMIN ERROR",e)
            location.reload()
          })
        }
      }
    }
  }
}
