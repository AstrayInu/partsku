import Component from '@ember/component';
import { later } from '@ember/runloop';
import { set } from '@ember/object';

export default class HeaderDesktopComponent extends Component {

  // didInsertElement()  {
  //   // dismiss alert after 5 sec
  //   let _this = this
  //   later(function()  {
  //     set(_this, 'response', null)
  //   }, 5000)
  // }

  // willDestroyElement()  {
  //   set(this, 'response', null)
  // }
}
