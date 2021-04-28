import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { action, set /*, get*/ } from '@ember/object';
import fetch from 'fetch'

export default class UserProfileController extends Controller {
  @service storage
  @service admin

  @action
  upload(event) {
    const file = event.target.files[0];
    let formData = new FormData();
    let reader = new FileReader()
    
    // show img
    var imgs = document.getElementById("imgss")
    imgs.src = URL.createObjectURL(file)

    if(file.type != 'image/jpeg' && file.type != 'image/png') {
      alert('Gambar harus berformat .jpg atau .png')
    } else {
      if(file) reader.readAsDataURL(file) // calls reader.onload if the file exists
      
      reader.onload = (e) => {
        let img64 = e.target.result
          , url = `http://localhost:3000/users/profilePicture`
        // console.log("reader", img64)
        formData.append('imgData', img64)
    
        // put file in formData
        formData.append('imgData', this.admin.base64toBlob(img64), `user-123.png`)
        // console.log(this.admin.base64toBlob(img64))
        formData.append('uid', this.storage.lget('_partsku_uid'))
        
        console.log(formData)
        // let postType = `POST`
        // $.ajax({
        //   xhr: function() {
        //     var xhr = new window.XMLHttpRequest();
        //     //Upload progress
        //     // xhr.upload.addEventListener("progress", function(evt){
        //       //   if (evt.lengthComputable) {
        //         //     var percentComplete = evt.loaded / evt.total;
        //         //     //Do something with upload progress
        //         //     set(_this, 'progressBar', Math.floor(percentComplete*100))
        //         //   }
        //         // }, false);
                
        //     return xhr;
        //   },
        //   processData: false,
        //   contentType: false,
        //   cache: false,
        //   enctype: 'multipart/form-data',
        //   type: postType,
        //   url,
        //   data: formData,
        //   success: function(response){
        //     console.log("response",response)
        //   },
        //   error: function(reason) {
        //     console.log("reason", reason)
        //   },
        //   // headers: {
        //     //   'X-TOKEN': this.storage.lget('_dop_token')
        //     // }
        //   })
        fetch(`http://localhost:3000/users/profilePicture`, {
          method: 'POST',
          body: formData,
          // headers: {
          //   'X-TOKEN': xtoken
          // }
        }).then( response => {
          console.log("RESPONSE", response)
        }).catch( e => {
          console.log("ERROR", e)
          // alert(e)
        })
      }      
    }
  }

}
