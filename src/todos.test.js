// @flow strict
import React from 'react';
import { shallow, type ShallowWrapper } from 'enzyme';
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
  const enterInput = (input: ShallowWrapper, value: string): void => {
    const event = mockEvent({ value });
    input.simulate('change', event);
  };

  it('does not render empty list', () => {
    const todos = shallow(<Todos />);
    expect(todos).toMatchSnapshot();
  });

  it('disables submit button when input is empty', () => {
    const todos = shallow(<Todos />);
    expect(todos.find('button').prop('disabled')).toEqual(true);
  });

  it('enables submit button when input has value', () => {
    const todos = shallow(<Todos />);
    const input = todos.find('input');
    enterInput(input, 'anything');
    expect(todos.find('button').prop('disabled')).toEqual(false);
  });

  it('renders the list of values', () => {
    const value = 'Hasenschwanzbruch';

    const todos = shallow(<Todos />);
    const input = todos.find('input');
    enterInput(input, value);
    expect(todos).toMatchSnapshot();
    expect(todos.state('inputValue')).toEqual(value);

    const form = todos.find('form');
    form.simulate('submit', mockEvent());
    expect(todos).toMatchSnapshot();
    expect(todos.state('inputValue')).toEqual('');
    expect(todos.state('values')).toEqual([value]);
  });
});
