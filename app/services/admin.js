
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class AdminService extends Service {
  @service storage

  base64toBlob(data) {
    var byteString = atob(data.split(',')[1]);
    var mimeString = data.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var dw = new DataView(ab);

    for(var i = 0; i < byteString.length; i++) {
        dw.setUint8(i, byteString.charCodeAt(i));
    }

    return new Blob([ab], {type: mimeString});
  }
}