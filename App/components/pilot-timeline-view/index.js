

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
import colorScheme from '../../config/colors';


class PilotTimeLineView extends Component {
  constructor(props) {
      super(props);
      const {portCalls} = this.props;
     //var listOfFavoritePortcalls = this.props.favoritePortCalls;
      var text = "Hello World2!";
      var text2;
      this.state = { numLoadedPortCalls: 20,};
      this.search(portCalls, "Marinus").map( (portCall) => ( text2 = portCall.vessel.imo
                            ))
      //var timestamp = this.props.fetchPortCallEvents();

      //var test = this.props.fetchPortCallEvents("urn:mrn:stm:portcdm:port_call:SEGOT:861f2e56-8289-4f48-80c0-4451900473c2");

      this.state = {showChangeLog: false, titleText: "Hejsan", hw: text2};
      //search(portCalls, "Hanna")
      var onePortCall;
  }

  _onViewPortCall = (portCallId) => {
    this.props.fetchPortCall(portCallId)
        .then(this.props.selectPortCall)
        .then(() => this.props.navigation.navigate('TimeLine'))
}
  
  componentWillMount() {
    this.loadOperations();
  }
  
  loadOperations() {
    onePortCall = this.props.portCalls[6];
    this.props.fetchPortCallEvents(onePortCall.portCallId).then(this.finishedFetchingEvents);
  }

  componentWillUnmount() {
        clearInterval(timer);
    }

  finishedFetchingEvents() {
    console.log("hej");
    console.log(JSON.stringify(this.props.fetchedEvents));
    //console.log(JSON.stringify(this.state.fetchedEvents));
    console.log("hej igen");
  }

  render() {
    const {portCalls} = this.props;


    // var listOfFavoritePortcalls = this.props.favoritePortCalls;

    // var ListOfAllPortCalls = this.props.portCalls;

    // var ettFavoritPortCall = listOfFavoritePortcalls[0];



//Metod för att kolla om det är en favorit eller ej 
    if (this.props.favoritePortCalls.includes(onePortCall.portCallId)) {
      console.log("DET HÄR ÄR EN FAVORIT")}
      else {
      console.log("DEt här är inte en favorit")
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

        <View>
          <View>
            <Text>
    
              
{JSON.stringify(onePortCall)}
          
          
STARTTID:
          {onePortCall.startTime}
SLUTTID:
        {onePortCall.endTime}

            </Text>
          </View>
        </View>
      </View>
    );
  }

  // {JSON.stringify(onePortCall)}  ger all data som finns lagrat i ett portcall. 

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

// class PilotTimeLineView extends Component {
//   constructor(props) {
//       super(props);
//       const {portCalls} = this.props;
//       var text = "Hello World2!";
//       var text2;
//       this.state = { numLoadedPortCalls: 20,};
      
//       this.state = {showChangeLog: false, titleText: "Hejsan", hw: text2};

//   }

//   render() {

//   const {portCalls} = this.props;
//   var listOfFavoritePortcalls = this.props.favoritePortCalls; //An array of all favoritedPortcalls. 
//     return(
//       <View>
//         <Modal
//             animationType={'slide'}
//             transparent={false}
//             style={{backgroundColor: colorScheme.backgroundColor}}
//             visible={this.state.showChangeLog}
//             onRequestClose={() => this.setState({showChangeLog: false})}
//         >
//             <TopHeader modal title="Change log" backArrowFunction={() => this.setState({showChangeLog: false})}/>
            
//         </Modal>

//         <TopHeader
//           title="Pilot Scheduling"
//           firstPage
//           navigation={this.props.navigation}
//         />

//         <View>
//           <View>
//           <Text> {listOfFavoritePortcalls.toString()} 
      
//           </Text>

//           </View>
        
//         </View>
//       </View>
//     );
//   }
// }

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

