import Component from '@ember/component';
import { computed, action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DropdownsComponent extends Component {
  @action
  trigger(val) {
    console.log("==>",val)
    this.action(val)
  }
}