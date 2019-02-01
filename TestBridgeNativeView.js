//  Created by react-native-create-bridge

/*import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'
import PropTypes from 'prop-types';

const TestBridge = requireNativeComponent('TestBridge', TestBridgeView)

export default class TestBridgeView extends Component {
  render () {
    return <TestBridge {...this.props} />
  }
}

TestBridgeView.propTypes = {
  exampleProp: React.PropTypes.string
} */

import React from 'react';
import { requireNativeComponent } from 'react-native'
import PropTypes from 'prop-types';

const TestBridge = requireNativeComponent('TestBridge', TestBridgeView)

export default class TestBridgeView extends React.Component {
render() {
return <TestBridge {...this.props} />
}
}
TestBridgeView.propTypes = {
exampleProp: PropTypes.string.isRequired,
};
