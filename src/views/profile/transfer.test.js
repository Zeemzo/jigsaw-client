import React from 'react';
import { shallow } from 'enzyme';
import Transfer from './transfer';
describe('Transfer', () => {
  it('Transfer should render correctly in "debug" mode', () => {
    const component = shallow(<Transfer debug />);
  
    expect(component).toMatchSnapshot();
  });
});