import Controller from '@ember/controller';
import { computed, action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CatalogController extends Controller {
  constructor() {
    super(...arguments);
    this.queryParams = [
      'q', 'brand', "category", 'limit', 'offset', 'sort'
    ]
  }

  get searchResult() {
    if(this.params.q) return this.params.q
    else if(this.params.brand) return this.params.brand
    else if(this.params.category) return this.params.category
  }

  @computed('offset')
  get currentPage() {
    console.log("currentPage" , (Number(this.offset) / Number(this.limit)) + 1)
    return (Number(this.offset) / Number(this.limit)) + 1
  }

  @computed('data', 'query')
  get needsPagination() {
    // console.log("Total data & limit", this.data.total, this.limit)
    return Number(this.data.total) > Number(this.limit)
  }

  @computed('data', 'query')
  get numberOfPages() {
    let numOfPages = Math.ceil(Number(this.data.total) / Number(this.limit))
      , pages = []
    
    for(let i=0 ; i<numOfPages ; i++) {
      pages.push({num: i+1, offset: 16*i})
    }

    return pages
  }

  @computed('offset')
  get showPrev() {
    return this.offset != 0
  }

  @computed('offset')
  get showNext() {
    return this.currentPage != this.numberOfPages.length
  }

  @action
  applySort(val) {
    set(this, 'sort', val);
  }

  @action
  applyBrand(val) {
    console.log(val)
    let split = val.split('.')
    split = split.length == 2 ? split[1] : split[0]
    set(this, 'brand', split)
  }

  @action
  applyCategory(val) {
    let split = val.split('.')
    split = split.length == 2 ? split[1] : split[0]
    set(this, 'category', split)
  }

  @action
  clearFilters() {
    let types = [ 'q', 'brand', 'category', 'sort' ]
    for (let type of types) {
      set(this, type, null)
    }
  }

  @action
  prevPage() {
    // if(this.offset)
    set(this, 'offset', Number(this.offset)-16)

  }

  @action
  nextPage() {
    console.log("NEXT", this.offset)
    set(this, 'offset', Number(this.offset)+16)
  }

}
