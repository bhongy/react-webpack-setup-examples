import React, { PureComponent } from 'react';

// eslint-disable-next-line no-undef
const asyncComponent = getComponent =>
  class AsyncComponent extends PureComponent {
    constructor(props) {
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
