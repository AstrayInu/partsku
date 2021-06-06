import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | seller/product/add', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:seller/product/add');
    assert.ok(route);
  });
});
