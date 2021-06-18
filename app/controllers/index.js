import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { match, notEmpty } from '@ember/object/computed';
import { computed, action, set } from '@ember/object';

export default class IndexController extends Controller {
  @action
  search(val) {
    let keyword = this.searchQuery
    this.transitionToRoute("catalog", {queryParams: {q: keyword, limit: 24, offset: 0}})
  }
}
