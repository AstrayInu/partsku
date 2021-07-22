import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { computed, action, set } from '@ember/object';

export default class StarRatingComponent extends Component {
  @computed("rate", "num")
  get selected() {
    if(this.rate) {
      let rate = this.rate
        , ids = ['starhalf-static', 'star1-static', 'star1half-static', 'star2-static', 'star2half-static', 'star3-static', 'star3half-static', 'star4-static', 'star4half-static', 'star5-static']
        , count = rate / 0.5
      // console.log(document.getElementById(`${ids[count-1]}-${this.pid}`))
      document.getElementById(`${ids[count-1]}-${this.pid}`).checked = true
    }
  }
}