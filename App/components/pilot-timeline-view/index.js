

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

export default class PilotTimeLineView extends Component {
  constructor(props) {
    super(props);
    this.state = {showChangeLog: false};
	  this.rows = [];
	  for(var i = 1; i < 4;  i++){
		  this.rows.push('');
	  }
	  
    time = moment();
    time.subtract(2, "days");

	  this.cols = [];
	  for(var j = 0; j < 120;   j++){
      time.add(1, "hour");
		  this.cols.push({key: j, timeInt: time.unix()});
	  }
  }

  intToTimeString(int) {
    time = moment().parse(int);
    if (int % 12 == 0) {
      return time.format("llll");
    }
  }

  intToDateString(int) {
    time = moment().parse(int);
    if (int % 12 == 0) {
      return time.format("llll");
    }
    return "";
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
				<Grid>
            <Row key = { 0 } style = { styles.row }>
              {
                this.cols.map((itemCol, keyCol) =>
                (

                  <Col key = { keyCol } style = { styles.col2}>
                    <Text style = {styles.colText}>{this.intToDateString(itemCol.timeInt)}{'\n'}{this.intToTimeString(itemCol.timeInt)}</Text>


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
                  <Col key = { keyCol } style = { styles.col }>
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
                height: 40
        },
        col: {
				  width: 60,
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
        }

     
});


