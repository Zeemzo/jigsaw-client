import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { mount, shallow, render } from 'enzyme';
import BlockchainAccount from './BlockchainAccount';
describe('BlockchainAccount', () => {
  it('BlockchainAccount should render correctly in "debug" mode', () => {
    const component = shallow(<BlockchainAccount debug />);

    expect(component).toMatchSnapshot();
  });
  // it('should be possible to activate button with Spacebar', () => {
  //   const component = mount(<BlockchainAccount />);
  //   // component
  //     // .find('button#my-button-one')
  //     // .simulate('keydown', { keyCode: 32 });
  //   expect(component).toMatchSnapshot();
  //   component.unmount();
  // });
});

