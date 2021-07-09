import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | user/orders/detail', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:user/orders/detail');
    assert.ok(route);
  });
});
