// @flow strict
import * as React from 'react';

type State<Props> = {
  Component: ?React.ComponentType<Props>,
};

const asyncComponent = <T>(
  getComponent: () => Promise<React.ComponentType<T>>
) =>
  class AsyncComponent extends React.Component<T, State<T>> {
    constructor(props: T) {
      super(props);
      this.state = { Component: null };
    }

    componentDidMount() {
      getComponent().then(Component => this.setState({ Component }));
    }

    render() {
      const { Component } = this.state;

      if (!Component) {
        return null;
      }

      return <Component {...this.props} />;
    }
  };

export default asyncComponent;
