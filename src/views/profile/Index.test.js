import React from 'react';
import { shallow } from 'enzyme';
import Wallet from './Index';
describe('Wallet', () => {
  it('Wallet should render correctly in "debug" mode', () => {
    const component = shallow(<Wallet debug />);
  
    expect(component).toMatchSnapshot();
  });
});