import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { computed, action, set } from '@ember/object';
import fetch from 'fetch'

export default class SellerProductAddController extends Controller {
  @service storage
  @service admin

  get pellOptions() {
    return this.admin.pellOption
  }

  get itemConditions() {
    return this.admin.itemConditions
  }

  @computed('isColoured', 'isValidName', 'isValidPrice', 'isValidYear', 'isValidSKU', 'isValidCondition', 'isValidColour', 'isValidStock')
  get isDisabled() {
    if(this.isColoured) return !this.isValidName || !this.isValidPrice || !this.isValidYear || !this.isValidSKU || !this.isValidCondition || !this.isValidColour || !this.isValidStock
    else return !this.isValidName || !this.isValidPrice || !this.isValidYear || !this.isValidSKU  || !this.isValidCondition || !this.isValidStock
  }

  @computed('isColoured')
  get coloured() {
    return this.isColoured
  }

  @computed('price')
  get numberFormat() {
    return new Intl.NumberFormat('de-de').format(this.price)
  }

  get tempPid() {
    let id = `p${Date.now()}`
      , productData = this.storage.sget('productData')

    if(!productData.pid) productData.pid = id

    this.storage.sset('productData.pid', id)

    return id
  }

  @action
  inputName(val) {
    set(this, 'name', val)
    if(val.length > 5) set(this, 'isValidName', true)
    else set(this, 'isValidName', false)
  }

  @action
  inputPrice(val) {
    console.log(val.length)
    let price = val
    let number_string = val.replace(/[^\d]/g, '').toString(),
        split   		= number_string.split(','),
        sisa     		= split[0].length % 3,
        rupiah     	= split[0].substr(0, sisa),
        ribuan     	= split[0].substr(sisa).match(/\d{3}/gi);

    if(ribuan){
      let separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    set(this, 'price', Number(rupiah.replace(/\.|\D+/g, '')))
    set(this, 'priceVal', Number(rupiah.replace(/\.|\D+/g, '')).toLocaleString('ID')) // replace non digits or "." char
    if(price.length > 2){
      set(this, 'isValidPrice', true)
    } else {
      set(this, 'isValidPrice', false)
    }
  }

  @action
  inputYear(val) {
    if(val.match(/\d/)) {
      let d = new Date()
      if(val > d.getFullYear() || val < 1900 || val.length < 3) set(this, 'isValidYear', false)
      else {
        set(this, 'year', val)
        set(this, 'isValidYear', true)
      }
    } else set(this, 'year', '')
  }

  @action
  inputSKU(val) {
    if(val.length > 0) {
      set(this, 'sku', val)
      set(this, 'isValidSKU', true)
    }
    else set(this, 'isValidSKU', false)
  }

  @action
  chooseCondition(val) {
    if(val !== '') {
      set(this, 'condition', val)
      set(this, 'isValidCondition', true)
    } else {
      set(this, 'isValidCondition', false)
    }
  }

  @action
  hasColour(val) {
    val = val==='yes' ? true : false
    set(this, 'isColoured', val)
    if(val) document.getElementById("no").checked = false
    else document.getElementById("yes").checked = false
  }

  @action
  inputColour(val) {
    if(val.match(/\w/)) {
      set(this, 'colour', val)
      if(val.length > 3) set(this, 'isValidColour', true)
      else set(this, 'isValidColour', false)
    } else set(this, 'isValidColour', false)
  }

  @action
  inputStock(val) {
    if(val.match(/\d/)) {
      set(this, 'stock', val)
      set(this, 'isValidStock', true)
    } else {
      set(this, 'stock', '')
      set(this, 'isValidStock', false)
    }
  }

  @action
  changeDescription(val) {
    set(this, 'description', val)
  }

  @action
  inputImage(event) {
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
          , url = `http://localhost:3000/products/images/tmp`
        // console.log("reader", img64)
        formData.append('imgData', img64)

        // put file in formData
        formData.append('imgData', this.admin.base64toBlob(img64), `product-123.png`)
        // console.log(this.admin.base64toBlob(img64))
        formData.append('uid', this.storage.lget('seller_id'))
        formData.append('pid', this.tempPid)

        console.log(formData)

        fetch(`http://localhost:3000/products/images/tmp`, {
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

  @action
  submit() {
    if(!$('.pell-content').html().match(/<img.*>/g)) {
      // set the necessary data
      let data = {
        // brand: this.brand, // define brand list first, will be using dropdown
        condition: this.condition,
        description: $('.pell-content').html(), // use ember-pell later
        // location: this.storage.lget('seller_location'),
        name: this.name,
        // preorder: this.preorder,
        price: this.price,
        // sid: this.storage.lget('seller_id'), // seller id
        sku: this.sku,
        stock: this.stock,
        year: this.year
      }

      if(this.isColoured) data.colour = this.colour

      let productData = this.storage.sget('productData')
      productData.data = data
      productData.pid = this.tempPid
      this.storage.sset('productData', productData)


      // show confirmation pop-up

      console.log("SUBMIT", data)
    } else alert('Deskripsi tidak boleh mengandung gambar!')
  }

  @action
  confirm() {
    // send data to BE...somehow
    fetch(`http://localhost:3000/products`, {
      method: 'POST',
      body: data
    }).then( response => {
      console.log("RESPONSE", response)
    }).catch( e => {
      console.log("ERROR", e)
      // alert(e)
    })
  }
}
