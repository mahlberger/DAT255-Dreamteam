import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  Alert,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  List,
  ListItem,
  Text,
  Button,
  Icon,
} from 'react-native-elements';


import TopHeader from '../top-header-view';
import { APP_VERSION } from '../../config/version';
import colorScheme from '../../config/colors';
import PortCallDetails from './sections/PortCallDetails';
import PortCall from '../../PortCall.js';
// Anton-Filip-Kod
import {
  fetchEventsForLocation,
    updatePortCalls,
    selectPortCall,
    toggleFavoritePortCall,
    toggleFavoriteVessel,
    appendPortCalls,
    bufferPortCalls,
    setError,
    fetchPortCallEvents,
    fetchPortCall,
    selectNewDate,
    changeLookAheadDays,
    changeLookBehindDays,
    setFilterOnSources,
 } from '../../actions';

const portcallIndex = 0;

class PilotTimeLineView extends Component {
  constructor(props) {
    super(props);
    this.state = {showChangeLog: false, colWidth: 40, hoursLookingBack: 20, hoursLookingForward: 20, showTimelineDetailsModal: false};

    this.updateZoomState = this.updateZoomState.bind(this);

    this.now = new Date();

  }

  intToTimeString(timeObj) {
    return timeObj.getHours() + ':' + ('0'+timeObj.getMinutes()).slice(-2);
  }

  intToDateString(timeObj) {
    if (timeObj.getHours() % 12 == 0) {
      return (timeObj.getDate()) + '/' + (timeObj.getMonth()+1);
    }
    return "";
  }

  componentDidMount() {
    const fx = () => this.refs._scrollViewHorizontal.scrollTo({
      x: this.getLeftOffSet(this.now) - Dimensions.get('window').width/2,
      animated: false
    });
    timerid = setTimeout( fx, 30 );
  }

  getLeftOffSet(date, string){
    var offset;
    offset = ((date-this.firstTime)/(1000*60*60))*(this.state.colWidth);
    return offset;
  }

  updateZoomState(value) {
  //  console.log(value);
    this.setState(prevState => {
       return {colWidth: prevState.colWidth + value}
    });
    if (value>0) {
  //    console.log("Forward");
      this.setState(prevState => {
       return {hoursLookingForward: prevState.hoursLookingForward + 5}
      });
    }
    else {
      this.setState(prevState => {
       return {hoursLookingBack: prevState.hoursLookingBack + 5}
      });
    }
  }

  render() {
  const BULLET = '\u2022';
    this.firstTime = new Date(Math.floor(this.now.getTime()/1000/60/60)*1000*60*60);
    this.firstTime.setHours(this.firstTime.getHours()-this.state.hoursLookingBack);

    this.cols = [];
    for( var j = 0; j < this.state.hoursLookingBack + this.state.hoursLookingForward; j++){
      currentTime = new Date();
      currentTime.setTime(this.firstTime.getTime() + 1000*60*60*j); //add one hour
      this.cols.push({key: j, timeObj: currentTime});
    }

    const {portCalls} = this.props;

    let portcallIndex = 0;


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
			<ScrollView ref='_scrollViewHorizontal' horizontal={true} style= {{height: 400}}>
				<View style={
					{
					   borderRightColor: 'red',
					   borderRightWidth: 2,
					   position: 'absolute',
					   top: 0,
					   left: this.getLeftOffSet(this.now),
					   width: 0,
					   height: '100%'
					}
				}>
				</View>
        {
          this.cols.map((itemCol, keyCol) =>
          (
            <View key = { keyCol } style = {[ styles.timelineHeader, {left: -this.state.colWidth/2, width: this.state.colWidth }]}>
              <Text style = {styles.colText}>{this.intToDateString(itemCol.timeObj)}{'\n'}{this.intToTimeString(itemCol.timeObj)}</Text>
            </View>
          ))
        }
				{

					this.cols.map((itemCol, keyCol) =>
					(
						<View key = { keyCol } style = {[ styles.timelineRuler, {left: this.getLeftOffSet(itemCol.timeObj)}]}>

            </View>
					))
				}
        {
          portCalls.map((item, key) =>
          (
            <TouchableWithoutFeedback key = { key } onPress={ () => this.setState({showTimelineDetailsModal: !this.state.showTimelineDetailsModal, portCall: item}) }> 
            
            <View key = { key } style = { [ styles.timelinePortcall, {left: this.getLeftOffSet(new Date(item.startTime)), top: 50 + portcallIndex++*40 }]}>
                <Text>
                  {item.vessel.name}
                </Text>
            </View>
            </TouchableWithoutFeedback>
          ))
        }
		</ScrollView>
    {this.state.showTimelineDetailsModal && <PortCallDetails
        portCall = {this.state.portCall}
        isVisible={this.state.showTimelineDetailsModal}
        onClose={() => this.setState({showTimelineDetailsModal: false, eventDetails: {}})} 
        onViewPortCall={this.props.onViewPortCall}
    />}
    <Button
      onPress={ () => this.updateZoomState(10)}
      title="Zoom out"
      color="#841584"
      accessibilityLabel="zoom out"
    />

      <Button
      onPress={ () => this.updateZoomState(-10)}
      title="Zoom in"
      color="#841584"
      accessibilityLabel="zoom in"
    />

      </View>
    );
  }
}

const styles = StyleSheet.create({
    timelineModal: {
      width: 200,
      height: 200,
      backgroundColor: 'red',
    },
    row: {
      height: 300
    },
    timelineHeader: {
      height: 50,
    },
    timelineRuler: {
      width: 1,
      height: 400,
      backgroundColor: 'black',
      position: 'absolute',
      top: 50
    },
    timelinePortcall: {
      width: 60,
      height: 30,
      borderColor: 'blue',
      borderWidth: 2,
      position: 'absolute',
      top: 50, 
      backgroundColor: 'blue',
    },
    col: {
      borderRightColor: 'black',
      borderRightWidth: 1
    },
    col2: {
      width: 60,
      borderRightColor: 'transparent',
      borderRightWidth: 1,
      position: 'relative',
      left: -30,
      alignContent: 'center'
    },
    colText: {
      textAlign: 'center'
    },
    square: {
      width: 20,
      height: 20,
      borderColor: 'blue',
      borderWidth: 2,
      position: 'absolute'

    },
		lineCurrentTime: {
		   borderRightColor: 'red',
		   borderRightWidth: 2,
		   position: 'absolute',
		   top: 0,
		   left: global.lineCurrentTimeOffSet,
		   width: 0,
		   height: '100%'
		}
});

// Anton-Filip-Kod
function mapStateToProps(state) {
    return {
        portCalls: state.cache.portCalls,
        cacheLimit: state.cache.limit,
        favoritePortCalls: state.favorites.portCalls,
        favoriteVessels: state.favorites.vessels,
        showLoadingIcon: state.portCalls.portCallsAreLoading,
        filters: state.filters,
        error: state.error,
        isAppendingPortCalls: state.cache.appendingPortCalls,


        berth: state.berths.selectedLocation,
        events: state.berths.events,
        fetchingEvents: state.berths.fetchingEvents,
        date: state.berths.fetchForDate,
        error: state.error,
        displayRatio: state.berths.displayRatio,
        lookBehindDays: state.berths.lookBehindDays,
        lookAheadDays: state.berths.lookAheadDays,
        filterOnSources: state.berths.filterOnSources,
        previousFilters: state.berths.previousFilters,
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
    fetchPortCallEvents,
    fetchEventsForLocation,
    selectNewDate,
    fetchPortCall,
    selectPortCall,
    changeLookAheadDays,
    changeLookBehindDays,
    setFilterOnSources,
})(PilotTimeLineView);
