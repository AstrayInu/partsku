import Controller from '@ember/controller';
import { action, computed, set } from '@ember/object';
import $ from 'jquery';
import { inject as service } from '@ember/service';

export default class ProductDetailController extends Controller {
  @service session
  @service storage
  @service admin

  quantity = 1

  get sellerImg() {
    return this.sellerAttr.logo ? this.sellerAttr.logo : this.session.defaultPPic
  }

  get mainImg() {
    var img = new Image();
    img.addEventListener("load", function(){
        if(this.naturalHeight > this.naturalWidth) {
          $("#p-detail-main-img").width('auto').height('100%')
        } else {
          $("#p-detail-main-img").width('100%').height('auto')
        }
    });
    img.src = this.productAttr.imgUrl[0];

    return this.productAttr.imgUrl[0]
  }

  get subImg() {
    for(let i=0 ; i<this.productAttr.imgUrl.length ; i++) {
      var img = new Image();
      img.addEventListener("load", function(){
        if(this.naturalHeight > this.naturalWidth) {
          $(`#p-detail-sub-img-${i}`).width('auto').height('100%')
          $(`.p-detail-sub-img`).width('104px')
        } else {
          $(`#p-detail-sub-img-${i}`).width('100%').height('auto')
        }
      });
      img.src = this.productAttr.imgUrl[i];
    }
  }

  get itemCategory() {
    let x = this.product.category.split('.')
    return `${x[0]} > ${x[1]}`
  }

  get joined() {
    let d = new Date(this.seller.created_at)

    return d.toLocaleString('default', {year: 'numeric', month: 'long'});
  }

  @computed("avg")
  get starRating() {
    if(this.avg) {
      let rate = this.avg
        , ids = ['starhalf-static', 'star1-static', 'star1half-static', 'star2-static', 'star2half-static', 'star3-static', 'star3half-static', 'star4-static', 'star4half-static', 'star5-static']
        , count = rate / 0.5

      document.getElementById(`${ids[count-1]}`).checked = true
    }
  }

  @computed("quantity")
  get totalCart() {
    return Number(this.product.price * this.quantity)
  }

  @action
  waSeller() {
    let text = `Hi, I would like to ask about this product of yours :)%0Ahttps://partsku.id/product-detail/${this.product.pid}`

    window.open(`https://wa.me/62${this.sellerAttr.waNum}?text=${text}`, '_blank')
    // window.open(`https://wa.me/628111683183?text=${text}`, '_blank') // for testing
  }

  @action
  setMainImg(val) {
    document.getElementById("p-detail-main-img").src = val
  }

  @action
  plusQuantity() {
    if(this.quantity < this.product.stock) set(this, 'quantity', this.quantity + 1)
  }

  @action
  minQuantity() {
    if(this.quantity > 1) set(this, 'quantity', this.quantity - 1)
  }

  @action
  addToCart() {
    if(this.session.isUserLoggedin) {
      let toCart = {
        uid: this.storage.lget("user_id"),
        sid: this.sellerImg.sid,
        pid: this.product.pid,
        quantity: this.quantity
      }

      this.admin.addToCart(toCart).then(res => {
        // console.log("RES CART", res)
        // this.storage.lset("user_attributes", attr)
        alert("Item added to cart !")
      }).catch(e => {
        // console.log(e)
        alert("Whoops, something went wrong. Please try again later or contact us :)")
      })
    } else {
      alert("Please login to continue! or Register if you dont have an account")
      location.href = '/login'
    }
  }

  @action
  buyNow() {

  }

}
