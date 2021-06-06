import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | seller/register', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:seller/register');
    assert.ok(controller);
  });
});
