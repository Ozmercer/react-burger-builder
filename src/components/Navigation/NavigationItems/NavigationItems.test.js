import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('Navigation Items', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    });

    it('should should render 2 items when not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should should render 3 items when authenticated', () => {
        wrapper.setProps({ isAuth: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should should render logout link when authenticated', () => {
        wrapper.setProps({ isAuth: true })
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toBeTruthy();
    });
});