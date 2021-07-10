import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | seller/transaction-list', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:seller/transaction-list');
    assert.ok(route);
  });
});
