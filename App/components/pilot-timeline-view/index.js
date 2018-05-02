

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Grid } from "react-native-easy-grid";

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
const portcallIndex = 0;

export default class PilotTimeLineView extends Component {
  constructor(props) {
      super(props);
      this.state = {showChangeLog: false};

    this.HoursLookingBack = 48;
	  this.rows = [];
    this.portCalls = [];
	  for(var i = 0; i < 1; i++){
		  this.rows.push('');
	  }

	  this.cols = [];
	  for(var j = 0; j < 24*4; j++){
		  this.cols.push('');
	  }

    for(var j = 0; j < 2; j++){
      this.portCalls.push(new Date());
    }

    // Test för datum
    var testDate = new Date();
    testDate.setHours(testDate.getHours()+2);
    this.portCalls.push(testDate);

    this.now = new Date();
    this.firstTime = new Date();
    this.firstTime.setHours(this.now.getHours()-this.HoursLookingBack);
    this.lineCurrentTimeOffSet = this.getLeftOffSet(this.now);
  }

  getLeftOffSet(date){
      var offSet;
      return offSet = ((date-this.firstTime)/(1000*60*60))*(colWidth);
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
			<ScrollView horizontal={true}>
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
          {
            this.portCalls.map((item, key) =>
            (
              <View key = { key } style = { {
                width: 20,
                height: 20,
                borderColor: 'blue',
                borderWidth: 2,
                position: 'absolute',
                left: this.getLeftOffSet(item.getTime()),
                top: portcallIndex++*20

              }}>
              </View>
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
