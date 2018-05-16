

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

      this.state = {showChangeLog: false, titleText: "Hejsan", hw: text2};
      var onePortCall;

      this.finishedFetchingEvents = this.finishedFetchingEvents.bind(this);
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
    //for (i=0; i < this.props.portCalls.length; i++) {
      onePortCall = this.props.portCalls[0];
      oneFavPortCall = this.props.favoritePortCalls[0];
      //console.log(oneFavPortCall);
      //this.props.fetchPortCallEvents(onePortCall.portCallId).then(this.finishedFetchingEvents);
      this.props.fetchPortCallEvents(oneFavPortCall).then(this.finishedFetchingEvents);

    //}
  }

  finishedFetchingEvents() {
    console.log("hej");
    //console.log(this.props.fetchedEvents);

    let events = this.props.fetchedEvents;

    events = events.filter(event => {
      console.log("hej96");
      for (var i = 0; i < event.statements.length; i++)
      {
        console.log("tja98");
        if (event.statements[i].stateDefinition == "Pilotage_Completed")
        {
          return true;
        }
      }
      return false;
    });
    console.log("Tjabbatjena");
    console.log(events);


    console.log(JSON.stringify(oneFavPortCall));
    //console.log(JSON.stringify(this.state.fetchedEvents));
    console.log("hej igen");
    console.log(JSON.stringify(oneFavPortCall));
    console.log(this.props.portCalls.length);
    //console.log(this.props.fetchedEvents.Arrival_Vessel_Berth)
  }

  render() {
    const {portCalls} = this.props;


    // var listOfFavoritePortcalls = this.props.favoritePortCalls;

    // var ListOfAllPortCalls = this.props.portCalls;

    // var ettFavoritPortCall = listOfFavoritePortcalls[0];



//Metod för att kolla om det är en favorit eller ej 
    if (this.props.favoritePortCalls.includes(oneFavPortCall)) {
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
         

              {this.props.oneFavPortCall}              

              AVSKILJARE 

              
              


              

                Ovan hämtar data från plats 0, har en if sats för att kolla så den inte är tom. Då hämtar vi portcall från 1. 
            </Text>
          </View>
        </View>
      </View>
    );
  }
  
// MÅSTE FIXA SORT OCH FILTERFUNKTIONEN FÖR FETCHED EVETS - finns färdiga metoder att ta inspiration ifrån. 
// ? JSON.stringify(this.props.fetchedEvents[0].portCallId) : null

  //     {JSON.stringify(this.props.fetchedEvents)}
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

