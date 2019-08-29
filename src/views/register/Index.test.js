import React from 'react';
import { shallow } from 'enzyme';
import Registration from './Index';
describe('Registration', () => {
  it('Registration should render correctly in "debug" mode', () => {
    const component = shallow(<Registration debug />);
  
    expect(component).toMatchSnapshot();
  });
});