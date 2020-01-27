import React from 'react';
import { shallow } from 'enzyme';
import WordCatalogPage from '../../components/WordCatalogPage';

test('should render WordCatalogPage', () => {
    const wrapper = shallow(<WordCatalogPage />);
    expect(wrapper).toMatchSnapshot();
});
