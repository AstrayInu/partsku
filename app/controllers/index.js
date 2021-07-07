import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { match, notEmpty } from '@ember/object/computed';
import { computed, action, set } from '@ember/object';

export default class IndexController extends Controller {
  @service admin

  get indexBrands1() {
    return this.admin.indexBrand.slice(0,4)
  }

  get indexBrands2() {
    return this.admin.indexBrand.slice(4)
  }

  @action
  showBrands() {
    if(!this.shown) {
      $("#brand-list2").removeClass("d-none")
      set(this, 'shown', true)
    } else {
      $("#brand-list2").addClass("d-none")
      set(this, 'shown', false)
    }
  }

  @action
  search(val) {
    let keyword = this.searchQuery
    this.transitionToRoute("catalog", {queryParams: {q: keyword, limit: 16, offset: 0}})
  }
}
