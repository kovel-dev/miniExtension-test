import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import store from '../../store';
import Auth from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Auth', () => {
  it('Renders Auth without crashing', () => {
    shallow(<Provider store={store}><Auth /></Provider>);
  });

  it('Renders login button, input label, debounce input', () => {
    const wrapper = mount(<Provider store={store}><Auth /></Provider>);

    expect(wrapper.find(`button`).first().text()).toBe("Login");
    expect(wrapper.find('h4').first().text()).toBe("Student Name:");
    expect(wrapper.find(`DebounceInput`)).toHaveLength(1);
  });

  const simulateOnChangeInput = (
    wrapper: Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>,
    inputSelector: string,
    newValue: string
  ) => {
    const input = wrapper.find(inputSelector);
    input.simulate("change", {
      target: { value: newValue },
    });

    return wrapper.find(inputSelector);
  };

  it("fill the input with values and then click the login button", () => {
    const wrapper = mount(<Provider store={store}><Auth /></Provider>);

    expect(wrapper.find(`button[id="loginButton"]`).first().text()).toBe("Login");

    const updatedStudentNameInput = simulateOnChangeInput(
      wrapper,
      `input[id="studentNameInput"]`,
      "Endzela"
    );

    expect(updatedStudentNameInput.props().value).toBe("Endzela");

    wrapper.find(`button[id="loginButton"]`).simulate("click");
  });
});
