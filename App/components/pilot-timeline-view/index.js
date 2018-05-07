

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Grid } from "react-native-easy-grid";
import moment from 'moment';

import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';

import {
  Text,
  Button,
  Icon,
} from 'react-native-elements';
import TopHeader from '../top-header-view';
import { APP_VERSION } from '../../config/version';
import colorScheme from '../../config/colors';

const colWidth = 60;
const HoursLookingBack = 48;

export default class PilotTimeLineView extends Component {
  constructor(props) {
      super(props);
      this.state = {showChangeLog: false};

	  this.rows = [];
	  for(var i = 1; i < 4;  i++){
		  this.rows.push('');
	  }

    this.now = new Date();

    var firstTime = new Date(Math.floor(this.now.getTime()/1000/60/60)*1000*60*60);
    firstTime.setHours(firstTime.getHours()-HoursLookingBack);

    this.lineCurrentTimeOffSet = ((this.now-firstTime)/(1000*60*60))*(colWidth);
    console.log(colWidth);

    console.log("Firstime: " + firstTime.getTime());

    this.cols = [];
    for( var j = 0; j < 96; j++){

      currentTime = new Date();
      currentTime.setTime(firstTime.getTime() + 1000*60*60*j); //add one hour
      console.log("Firstime: " + currentTime.getTime());
      this.cols.push({key: j, timeObj: currentTime});
    }
  }

  intToTimeString(timeObj) {
    return timeObj.getHours() + ':' + timeObj.getMinutes();
  }

  intToDateString(timeObj) {
    if (timeObj.getHours() % 12 == 0) {
      console.log(timeObj.getTime());
      return (timeObj.getDate()) + '/' + (timeObj.getMonth()+1);
    }
    return "";
  }

  componentDidMount() {
    console.log(78);
    const fx = () => this.refs._scrollViewHorizontal.scrollTo({
      x: this.lineCurrentTimeOffSet - Dimensions.get('window').width/2,
      animated: false
    });
    timerid = setTimeout( fx, 30 );
  }

  render() {
    const BULLET = '\u2022';
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
			<ScrollView ref='_scrollViewHorizontal' horizontal={true}>
				<Grid style={styles.container}>
					<View style={
						{
						   borderRightColor: 'red',
						   borderRightWidth: 2,
						   position: 'absolute',
						   top: 0,
						   left: this.lineCurrentTimeOffSet,
						   width: 0,
						   height: '100%'
						}
					}>
					</View>
            <Row key = { 0 } style = { styles.row }>
              {
                this.cols.map((itemCol, keyCol) =>
                (

                  <Col key = { keyCol } style = { styles.col2}>
                    <Text style = {styles.colText}>{this.intToDateString(itemCol.timeObj)}{'\n'}{this.intToTimeString(itemCol.timeObj)}</Text>


                  </Col>
                ))
              }
            </Row>
					{
					  this.rows.map(( itemRow, keyRow ) =>
					  (
						<Row key = { keyRow } style = { styles.row }>
							{
								this.cols.map((itemCol, keyCol) =>
								(
									<Col key = { keyCol } style = { styles.col}>
									</Col>
								))
							}
						</Row>
					  ))
					}
				</Grid>
			</ScrollView>
		</ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    row: {
      height: 200
    },
    col: {
		  width: colWidth,
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
