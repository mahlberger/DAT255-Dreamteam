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

import TopHeader from '../top-header-view';
import { APP_VERSION } from '../../config/version';
import colorScheme from '../../config/colors';

let portcallIndex = 0;

/*
{
  this.state.events.map((event) => (
    event.startTime
    event.endTime
    event.startTimeType
    event.endTimeType
    event.portCallId
  ))
}
*/

class PilotTimeLineView extends Component {
  j = 0;
  portCalls = [];
  events = [];

  constructor(props) {
    super(props);

    // Fetching portCalls
    const {portCalls} = this.props;

	  // colWidth = the width (in pixels) representing an hour
    this.state = {showChangeLog: false, colWidth: 40, hoursLookingBack: 96, hoursLookingForward: 96, events: [] };

	  this.updateZoomState = this.updateZoomState.bind(this);

	  this.now = new Date();

    this.finishedFetchingEvents = this.finishedFetchingEvents.bind(this);
  }

  componentWillMount() {
    this.loadOperations();
  }

  loadOperations() {
    for (i=0; i < this.props.portCalls.length; i++) {
      this.props.fetchPortCallEvents(this.props.portCalls[i].portCallId).then(this.finishedFetchingEvents);
    }
  }

  getPortCallById(portCallId) {
    for (i=0; i < this.props.portCalls.length; i++) {
      if (this.props.portCalls[i].portCallId == portCallId) {
        return this.props.portCalls[i];
      }
    }
    return false;
  }

  finishedFetchingEvents() {
    let events = this.props.fetchedEvents;

    this.j++;

    if (events.length >= 1 && events !== undefined) {
      this.events = this.events.concat(events);
    }

    if (this.j == this.props.portCalls.length) {
      this.setState({events: this.events});
    }
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

  getStartOfPortCall(startTime, endTime){
    if((startTime == null || startTime.getTime() == 0) && (endTime == null || endTime.getTime() == 0)){
      return this.getLeftOffSet(new Date());
    }else if(startTime == null || startTime.getTime() == 0){
      return this.getLeftOffSet(new Date(endTime.getTime()-1000*60*60*1.5));
    }else{
      return this.getLeftOffSet(startTime);
    }
  }

  getLeftOffSet(date){
    var offset;
    offset = ((date.getTime()-this.firstTime.getTime())/(1000*60*60))*(this.state.colWidth);
    return offset;
  }

  getWidth(startTime, endTime){
    // return 100;
    if(startTime == null || startTime == 0 || endTime == null || endTime == 0) return 0;
    return this.getLeftOffSet(new Date(endTime)) - this.getLeftOffSet(new Date(startTime));
  }

  getWidthOfPortCall(startTime, endTime){
    if((startTime == null || startTime.getTime() == 0) && (endTime == null || endTime.getTime() == 0)){
      return this.getWidth(new Date().getTime(), new Date().getTime()+(1000*60*60)*1.5);
    }else if(startTime == null || startTime.getTime() == 0){
      return this.getWidth(endTime.getTime(), endTime.getTime()+(1000*60*60)*1.5);
    }else if(endTime == null || endTime.getTime() == 0){
      return this.getWidth(startTime.getTime(), startTime.getTime()+(1000*60*60)*1.5);
    }else{
      return this.getWidth(startTime.getTime(), endTime.getTime());
    }
  }

  updateZoomState(value) {
    this.setState(prevState => {
       return {colWidth: prevState.colWidth + value}
    });
    if (value>0) {
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

  getColorsByState(event){

    if (event.startTimeType == null) {
      if (event.endTimeType == null) {
        return ['red', 'white', 'red'];
      }
      else if (event.endTimeType == 'ESTIMATED') {
        return ['white', 'black', 'purple']; //purple ram
      }
      else if (event.endTimeType == 'ACTUAL') {
        return ['white', 'black', 'black']; //svart ram
      }
      else {
        return ['white', 'white', 'white'];
      }
    }
    else if (event.startTimeType == 'ESTIMATED') {
      if (event.endTimeType == null) {
        return ['white', 'black', 'green']; //grön ram
      }
      else if (event.endTimeType == 'ESTIMATED') {
        return ['green', 'white', 'green'];
      }
      else if (event.endTimeType == 'ACTUAL') {
        return ['black', 'white', 'black'];
      }
      else {
        return ['grey', 'white', 'grey'];
      }
    }
    else if (event.startTimeType == 'ACTUAL') {
      if (event.endTimeType == null) {
        return ['white', 'black', 'black']; //svart ram
      }
      else if (event.endTimeType == 'ESTIMATED') {
        return ['blue', 'white', 'blue'];
      }
      else if (event.endTimeType == 'ACTUAL') {
        return ['black', 'white', 'black'];
      }
      else {
        return ['pink', 'white', 'pink'];
      }
    }
    return ['brown', 'white', 'brown'];
  }

  shouldComponentUpdate() {
    if (this.j >= this.props.portCalls.length) {
      return true;
    }
    return false;
  }

  render() {
    portcallIndex = 0;

    const {navigation, showLoadingIcon, portCalls, selectPortCall} = this.props;
    const {navigate} = navigation;
    let {events} = this.state;

    events = events.filter(event => {
      if (event.definitionId == "PILOTAGE_OPERATION" && (event.statements[0].stateDefinition == "Pilotage_Completed" || event.statements[0].stateDefinition == "Pilotage_Commenced" ) ) {
        return true;
      }
      return false;
    });

    const BULLET = '\u2022';
    this.firstTime = new Date(Math.floor(this.now.getTime()/1000/60/60)*1000*60*60);
    this.firstTime.setHours(this.firstTime.getHours()-this.state.hoursLookingBack);

    this.cols = [];
    for( var j = 0; j < this.state.hoursLookingBack + this.state.hoursLookingForward; j++){
      currentTime = new Date();
      currentTime.setTime(this.firstTime.getTime() + 1000*60*60*j); //add one hour
      this.cols.push({key: j, timeObj: currentTime});
    }
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
        <ScrollView>
			<ScrollView ref='_scrollViewHorizontal' horizontal={true} style= {{height: 1200}}>
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
            events.map((event, key) =>
              (
          		  <View key = { key } style = {[{position: 'absolute'}]}>
                  <TouchableWithoutFeedback key = { key } onPress={
            () => {
              selectPortCall(this.getPortCallById(event.portCallId));
              navigate('TimeLine');
            }}
            >
                  <View  key = { key + 1000 } style = { [ styles.stylePortCall, {left: this.getStartOfPortCall(new Date(event.startTime),
                  new Date(event.endTime)),
                    top: 50 + portcallIndex*40, backgroundColor: this.getColorsByState(event)[0], borderColor: this.getColorsByState(event)[2],
      			  width: this.getWidthOfPortCall(new Date(event.startTime), new Date(event.endTime))}]}>
                      <Text style = {[{ color: this.getColorsByState(event)[1] }]}>
                        {this.getPortCallById(event.portCallId).vessel.name}
                      </Text>
                  </View>
                  </TouchableWithoutFeedback>
          		    <View key = { key + 2000 } style = { [ styles.stylePortCallEndLines, {left: this.getStartOfPortCall(new Date(event.startTime), new Date(event.endTime))-1*this.state.colWidth,
                        top: 50 + portcallIndex*40,
          			  width: this.getWidth(new Date(event.startTime).getTime() - 1000*60*60, new Date(event.startTime).getTime())}]}>
                  </View>
          		    <View key = { key + 3000 } style = { [ styles.stylePortCallConnectingLine, {left: this.getStartOfPortCall(new Date(event.startTime), new Date(event.endTime))-1*this.state.colWidth,
                        top: 50 + portcallIndex++*40,
          			  width: this.state.colWidth}]}>
                  </View>
          		  </View>
            ))
          }
		</ScrollView>
    </ScrollView>

      </View>
    );
  }

  isFavorite(portCall) {
    return this.props.favoritePortCalls.includes(portCall.portCallId) ||
    this.props.favoriteVessels.includes(portCall.vessel.imo);
  }

//{listOfFavoritePortcalls.toString()}
  search(portCalls, searchTerm) {
        let { filters } = this.props;

        return portCalls.filter(portCall => {
            return (portCall.vessel.name.toUpperCase().includes(searchTerm.toUpperCase()) ||
            portCall.vessel.imo.split('IMO:')[1].startsWith(searchTerm) ||
            portCall.vessel.mmsi.split('MMSI:')[1].startsWith(searchTerm)) &&
            (!portCall.stage || filters.stages.includes(portCall.stage));
        }).sort((a,b) => this.sortFilters(a,b))//.sort((a,b) => a.status !== 'OK' ? -1 : 1)
        .slice(0, this.state.numLoadedPortCalls);
    }
}

const styles = StyleSheet.create({
    row: {
      height: 200
    },
    timelineHeader: {
      height: 50,
    },
    timelineRuler: {
      width: 1,
      height: 1200,
      backgroundColor: 'black',
      position: 'absolute',
      top: 50
    },
    stylePortCall: {
      width: 60,
      height: 30,
      borderWidth: 0,
	    backgroundColor: 'brown',
      position: 'absolute',
      borderWidth: 2
    },
    stylePortCallEndLines: {
      height: 30,
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 2,
      borderRightWidth: 0,
      borderColor: 'black',
      position: 'absolute'
    },
    stylePortCallConnectingLine: {
      height: 15,
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      borderBottomWidth: 2,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderColor: 'black',
      position: 'absolute',
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

        fetchedEvents: state.portCalls.selectedPortCallOperations, //Denna har vi lagt till

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
