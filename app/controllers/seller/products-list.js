import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { action, set, computed } from '@ember/object';

export default class SellerProductsListController extends Controller {
  @service admin
  @service storage

  @computed('isValidImgs', 'isValidName', 'isValidCategory', 'isValidPrice', 'isValidSKU', 'isValidCondition', 'isValidStock', 'isValidBrand', 'isValidDesc')
  get isDisabled() {
    // console.log(!this.isValidName, !this.isValidCategory, !this.isValidPrice, !this.isValidSKU, !this.isValidCondition, !this.isValidStock, !this.isValidBrand, !this.isValidDesc)
    return !this.isValidName || !this.isValidCategory || !this.isValidPrice || !this.isValidSKU || !this.isValidCondition || !this.isValidStock || !this.isValidBrand || !this.isValidDesc
  }

  get pellOptions() {
    return {
      actions: ['bold', 'italic', 'underline', 'strikethrough', 'heading1', 'heading2', 'paragraph', 'olist', 'ulist', 'line']
    }
  }

  get itemConditions() {
    return this.admin.itemConditions;
  }

  get productsList() {
    if(this.products.length > 0) {
      $("#list-infobox").addClass("no-bottom-borders")
      $("#list-container").addClass("extend-borders")
      return true
    } else {
      $("#list-infobox").removeClass("no-bottom-borders")
      $("#list-container").removeClass("extend-borders")
      return false
    }
  }

  @action
  addProduct(val) {
    console.log('val', val)
    if(val.brand) {
      for(let i=0 ; i<val.attributes.imgUrl.length ; i++) {
        document.getElementById(`img-${i+1}`).src = val.attributes.imgUrl[i]
      }
      
      set(this, 'itemName', val.name)
      set(this, 'category', val.category)
      set(this, 'price', val.price)
      set(this, 'sku', val.sku)
      set(this, 'condition', val.condition)
      set(this, 'stock', val.stock)
      set(this, 'brand', val.brand)
      set(this, 'description', val.description)
    }
    $("#plist-main-island-container").addClass("col-sm-6")
    $("#plist-main-island").addClass("d-none")
    $("#add-item-container").addClass("d-none")
    $("#plist-main-island-container").removeClass("col-sm-10")
    $("#add-p-main-island").removeClass("d-none")
    $("#spinner").hide()
  }

  @action
  closeAddProduct() {
    $("#plist-main-island-container").removeClass("col-sm-6")
    $("#plist-main-island").removeClass("d-none")
    $("#add-item-container").removeClass("d-none")
    $("#plist-main-island-container").addClass("col-sm-10")
    $("#add-p-main-island").addClass("d-none")
  }

  @action
  upload(num, event) {
    const file = event.target.files[0];
    let reader = new FileReader()

    // show img
    var imgs = document.getElementById(`img-${num}`)
    imgs.src = URL.createObjectURL(file)

    if(file.type != 'image/jpeg' && file.type != 'image/png') {
      alert('Gambar harus berformat .jpg atau .png')
    } else {
      if(file) reader.readAsDataURL(file) // calls reader.onload if the file exists

      reader.onload = (e) => {
        let img64 = e.target.result
          , uploadData = !this.storage.sget("tmpProductPics") ? [] : this.storage.sget("tmpProductPics")

        uploadData[num-1] = img64
        if(uploadData.length == 5) set(this, 'isValidImgs', true)
        this.storage.sset("tmpProductPics", uploadData)
      }
    }
  }

  @action
  inputName(val) {
    if(val.length > 0) {
      set(this, "isValidName", true)
      set(this, 'itemName', val)
    } else set(this, "isValidName", false)
  }

  @action
  inputCategory(val) {
    console.log("CAT", val)
    if(val.length > 0) {
      set(this, "isValidCategory", true)
      set(this, 'category', val)
    } else set(this, "isValidCategory", false)
  }

  @action
  inputPrice(val) {
    if(val.length > 0 && val.match(/[0-9]{3,12}/)) {
      set(this, "isValidPrice", true)
      set(this, 'price', val)
    } else {
      set(this, "isValidPrice", false)
    }
  }

  @action
  inputSKU(val) {
    if(val.length > 0) {
      set(this, "isValidSKU", true)
      set(this, 'sku', val)
    } else set(this, "isValidSKU", false)
  }

  @action
  inputCondition(val) {
    if(val.length > 0) {
      set(this, "isValidCondition", true)
      set(this, 'condition', val)
    } else set(this, "isValidCondition", false)
  }

  @action
  inputStock(val) {
    if(val.length > 0) {
      set(this, "isValidStock", true)
      set(this, 'stock', val)
    } else set(this, "isValidStock", false)
  }

  @action
  inputBrand(val) {
    console.log("BrAND", val)
    if(val.length > 0) {
      set(this, "isValidBrand", true)
      set(this, 'brand', val)
    } else set(this, "isValidBrand", false)
  }

  @action
  inputDescription() {
    console.log($('.pell-content').html().length)
    if($('.pell-content').html().length > 10) set(this, 'isValidDesc', true)
  }

  @action
  addItem() {
    let data = {
      sid: this.storage.lget("seller_id"),
      imgData: this.storage.sget("tmpProductPics"),
      name: this.itemName,
      category: this.category,
      price: this.price,
      sku: this.sku,
      condition: this.condition,
      stock: this.stock,
      brand: this.brand,
      description: $('.pell-content').html()
    }
    console.log('data', data)
    
    $("#add-item").hide()
    $("#spinner").show()
    this.admin.createProduct(data).then( res => {
      console.log(res)
      alert(res.msg)
      $("#add-item").show()
      $("#spinner").hide()
      location.reload()
    }).catch( e => {
      console.log(e)
    })
  }
}
