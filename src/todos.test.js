// @flow
import React from 'react';
import { shallow } from 'enzyme';
import Todos from './todos';

// TODO: extract to a test helper module
type MockEventTarget = {
  name?: string,
  value: string,
};
const mockEvent = (target?: MockEventTarget = { value: '' }) => ({
  preventDefault() {},
  currentTarget: target,
});

describe('Todos', () => {
  it('does not render empty list', () => {
    const todos = shallow(<Todos />);
    expect(todos).toMatchSnapshot();
  });

  it('renders the list of values', () => {
    const value = 'Hasenschwanzbruch';

    const todos = shallow(<Todos />);
    const input = todos.find('input');
    const inputChangeEvent = mockEvent({ value });
    input.simulate('change', inputChangeEvent);
    expect(todos).toMatchSnapshot();
    expect(todos.state('inputValue')).toEqual(value);

    const form = todos.find('form');
    form.simulate('submit', mockEvent());
    expect(todos).toMatchSnapshot();
    expect(todos.state('inputValue')).toEqual('');
    expect(todos.state('values')).toEqual([value]);
  });
});
