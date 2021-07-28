import Component from '@ember/component';
import { computed, action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DropdownsComponent extends Component {
  @computed('val')
  get selected() {
    if(this.val) document.getElementById(`${this.val}`).selected = true
  }

  @action
  selectVal(val) {
    // console.log("==>",val)
    this.action(val)
  }
}