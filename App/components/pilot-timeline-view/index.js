
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Alert,
    Modal,
} from 'react-native';

import {
    SearchBar,
    Button,
    List,
    ListItem,
    Icon,
} from 'react-native-elements';

import {
    updatePortCalls,
    selectPortCall,
    toggleFavoritePortCall,
    toggleFavoriteVessel,
    appendPortCalls,
    bufferPortCalls,
    setError,
 } from '../../actions';


import TopHeader from '../top-header-view';
import colorScheme from '../../config/colors';


class PilotTimeLineView extends Component {
  constructor(props) {
      super(props);
      const {portCalls} = this.props;
      var text = "Hello World2!";
      var text2;
      this.state = { numLoadedPortCalls: 20,};
      
      this.state = {showChangeLog: false, titleText: "Hejsan", hw: text2};

  }

  render() {

  const {portCalls} = this.props;
  var listOfFavoritePortcalls = this.props.favoritePortCalls; //An array of all favoritedPortcalls. 
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

        <View>
          <View>
          <Text> {listOfFavoritePortcalls.toString()} 
      
          </Text>

          </View>
        
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
        portCalls: state.cache.portCalls,
        cacheLimit: state.cache.limit,
        favoritePortCalls: state.favorites.portCalls,
        favoriteVessels: state.favorites.vessels,
        showLoadingIcon: state.portCalls.portCallsAreLoading,
        filters: state.filters,
        error: state.error,
        isAppendingPortCalls: state.cache.appendingPortCalls
    }
}

export default connect(mapStateToProps, {
    updatePortCalls,
    appendPortCalls,
    selectPortCall,
    toggleFavoritePortCall,
    toggleFavoriteVessel,
    bufferPortCalls,
    setError,
})(PilotTimeLineView);

