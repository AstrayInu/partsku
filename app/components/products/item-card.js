import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { action, set, computed } from '@ember/object';

export default class ProductsItemCardComponent extends Component {
 @action
 goTo(val) {
   location.href = `/product-detail/${val}`
 }
}
