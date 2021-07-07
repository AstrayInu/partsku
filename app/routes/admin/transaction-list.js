import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class AdminTransactionListRoute extends Route {
  @service admin
  @service storage

  beforeModel() {
    if(this.storage.lget("user_type") !== 'admin') {
      location.href = '/'
    }
  }
  
  async model() {
    let transactions = await this.admin.getTransactions()
    console.log('transactions', transactions)
    return hash({transactions})
  }

  setupController(controller, { transactions }) {
    controller.set("data", transactions)
    controller.set("pending", transactions.pending)
    controller.set("notPending", transactions.approved)

  }

}
