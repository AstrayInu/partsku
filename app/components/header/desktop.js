import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { match, notEmpty } from '@ember/object/computed';
import { computed, action, set } from '@ember/object';

export default class HeaderDesktopComponent extends Component {
  @service session
  
  get isLoggedIn() {
    return this.session.isUserLoggedin
  }

  get notSeller() {
    return this.session.isUserLoggedin && !this.session.isSellerLoggedin
  }

  @action
  logout() {
    
  }
}
