import Component from '@ember/component';
import { computed, action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery'

export default class DropdownsComponent extends Component {
  @computed('val')
  get selected() {
    if(this.val) document.getElementById(`${this.val}`).selected = true
  }

  didInsertElement() {
    if(this.multiple) {
      console.log(typeof false)
      if(this.type == 'brand') $('#brand').prop('multiple', 'multiple')
      else $('#category').prop('multiple', 'multiple')
    }
  }

  @action
  selectVal(val) {
    // console.log("==>",val)
    this.action(val)
  }
}