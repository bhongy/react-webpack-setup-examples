// @flow strict
import * as React from 'react';

type Props = {};
type State = {
  inputValue: string,
  values: Array<string>,
};

class Todos extends React.Component<Props, State> {
  state = {
    inputValue: '',
    values: [],
  };
  handleInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.currentTarget.value });
  };
  handleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState(prev => {
      const v = prev.inputValue;
      return {
        inputValue: '', // clear input
        values: prev.values.concat(v),
      };
    });
  };
  render() {
    const { inputValue, values } = this.state;
    return (
      <React.Fragment>
        {values.length > 0 && (
          <ul>{values.map((v, i) => <li key={i}>{v}</li>)}</ul>
        )}
        <form onSubmit={this.handleFormSubmit}>
          <input
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            type="text"
            placeholder="value to add"
          />
          <button disabled={!inputValue}>Add</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Todos;
