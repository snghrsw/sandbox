jest.unmock('./Detail.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Detail from './Detail.js';

import { shallow } from 'enzyme'


describe('<Detail />', () => {
	it('exist detail paragraph', () => {
		const detail = shallow(
			<Detail />
		);
		expect(detail.find("p").contains('詳細ページ')).toEqual(true);
	});
});