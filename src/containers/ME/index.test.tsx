import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import ME from './index';
import store from '../../store';

Enzyme.configure({ adapter: new Adapter() });

describe('ME', () => {
    it('Renders HomeView without crashing', () => {
        shallow(<Provider store={store}><ME /></Provider>);
    });
});
