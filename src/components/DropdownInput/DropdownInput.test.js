import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import DropdownInput from './index';

const setup = () => {
    const menuItems = [
        { id: 1, value: 'Value 1' },
        { id: 2, value: 'Value 2' },
        { id: 3, value: 'Value 3' },
    ];

    const props = {
        name: 'DropdownTest',
        label: 'Test',
        value: 'Value',
        handleChange: () => {},
        selections: menuItems,
    };

    return shallow(<DropdownInput {...props} />);
};

describe('Dropdown Input', () => {
    it('has 3 menu items', () => {
        const wrapper = setup();
        // TODO: Write test to check for menu items.
    });
});
