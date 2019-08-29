import React from 'react';
import { shallow } from 'enzyme';
import Login from './Index';
describe('Login', () => {
  it('Login should render correctly in "debug" mode', () => {
    const component = shallow(<Login debug />);
  
    expect(component).toMatchSnapshot();
  });
});