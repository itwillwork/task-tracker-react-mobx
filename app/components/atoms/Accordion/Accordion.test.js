// Link.react-test.js
import React from 'react';
import Accordion from './Accordion';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
	const component = renderer.create(
		<Accordion herf="http://www.facebook.com">Facebook</Accordion>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	component.getInstance().showChildren();
	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	component.getInstance().hideChildren();
	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});