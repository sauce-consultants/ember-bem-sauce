import {
  test
} from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | test component');

test('visiting / renders test-component', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    const $component = find('.test'),
      $child = find('.test__button');

    assert.equal($component.length, 1, 'has test component');
    assert.equal($child.length, 1, 'has test child component');

    // Check component has no modifiers set
    assert.equal($component.hasClass('test--disabled'), false, 'Does not have disabled class');
    assert.equal($component.hasClass('test--primary'), false, 'Does not have style class');
    assert.equal($component.hasClass('test--has-title'), false, 'Does not have title class');

    // Check component has no child modifiers set
    assert.equal($child.hasClass('test__button--disabled'), false, 'Child element does not have disabled class');
    assert.equal($child.hasClass('test__button--primary'), false, 'Child element does not have style class');
    assert.equal($child.hasClass('test__button--has-title'), false, 'Child element does not have title class');

    // fill in fields
    click('.disabled-button');
    fillIn('.title-input', 'This Is My Title');
    fillIn('.style-input', 'primary');

    andThen(() => {

      // Check component has modifiers set
      assert.equal($component.hasClass('test--disabled'), true, 'Has disabled class');
      assert.equal($component.hasClass('test--primary'), true, 'Has style class');
      assert.equal($component.hasClass('test--has-title'), true, 'Has title class');

      // Check component has child modifiers set
      assert.equal($child.hasClass('test__button--disabled'), true, 'Child element has disabled class');
      assert.equal($child.hasClass('test__button--primary'), true, 'Child element has style class');
      assert.equal($child.hasClass('test__button--has-title'), true, 'Child element has title class');

      // Update style again to make sure it's detected
      fillIn('.style-input', 'accent');

      andThen(() => {
        assert.equal($component.hasClass('test--accent'), true, 'Has style class');
        assert.equal($child.hasClass('test__button--accent'), true, 'Child element has style class');
      });
    });
  });
});