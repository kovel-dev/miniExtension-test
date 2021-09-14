import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import store from '../../store';
import Home from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Home', () => {
  it('Renders Auth without crashing', () => {
    shallow(<Provider store={store}><Home /></Provider>);
  });

  it('Renders logout button', () => {
    const wrapper = mount(<Provider store={store}><Home /></Provider>);

    expect(wrapper.find(`button`).first().text()).toBe("Logout");
  });
});
