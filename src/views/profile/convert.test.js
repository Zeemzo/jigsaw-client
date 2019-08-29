import React from 'react';
import { shallow } from 'enzyme';
import Convert from './convert';
describe('Convert', () => {
  it('Convert should render correctly in "debug" mode', () => {
    const component = shallow(<Convert debug />);
  
    expect(component).toMatchSnapshot();
  });
});