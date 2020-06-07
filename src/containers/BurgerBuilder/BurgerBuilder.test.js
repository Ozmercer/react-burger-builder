import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()})

describe('BurgerBuilder', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />)
    });

    it('should show build controls only when has ingredients', () => {
        wrapper.setProps({ingredients: {meat: 1, cheese: 1}})
        expect(wrapper.find(BuildControls)).toBeTruthy();
    });
});