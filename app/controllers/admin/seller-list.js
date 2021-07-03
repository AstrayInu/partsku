import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { action, set, computed } from '@ember/object';

export default class AdminSellerListController extends Controller {
  @computed('shows')
  get showList() {
    if(this.shows == "new") return "new"
    if(this.shows == "approved") return "approved"
  }

  @action
  changeView(val) {
    set(this, 'shows', val)
    if(this.shows == "new") {
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
}
