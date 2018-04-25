

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Modal,
} from 'react-native';

import TopHeader from '../top-header-view';
import colorScheme from '../../config/colors';


export default class PilotTimeLineView extends Component {
  constructor(props) {
      super(props);
      this.state = {showChangeLog: false}
  }

  render() {
    return(
      <View>
        <Modal
            animationType={'slide'}
            transparent={false}
            style={{backgroundColor: colorScheme.backgroundColor}}
            visible={this.state.showChangeLog}
            onRequestClose={() => this.setState({showChangeLog: false})}
        >
            <TopHeader modal title="Change log" backArrowFunction={() => this.setState({showChangeLog: false})}/>
            
        </Modal>
        <TopHeader
          title="Pilot Scheduling"
          firstPage
          navigation={this.props.navigation}
        />
        
      </View>
    );
  }
}


