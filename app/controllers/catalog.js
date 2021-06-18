import Controller from '@ember/controller';
import { computed, action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CatalogController extends Controller {
  constructor() {
    super(...arguments);
    this.queryParams = [
      'q', 'limit', 'offset', 'sort'
    ]
  }

  @computed('data', 'query')
  get needsPagination() {
    // return Number(this.data.total) > Number(this.queryParams.limit)
  }
  

  @action
  applySort(val) {
    set(this, 'sort', val);
  }

  @action
  loadMore() {

  }
}
