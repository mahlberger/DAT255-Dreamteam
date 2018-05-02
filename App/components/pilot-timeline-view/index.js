

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

export default class PilotTimeLineView extends Component {
  constructor(props) {
      super(props);
      this.state = {showChangeLog: false};
	  this.rows = [];
	  for(var i = 0; i < 1; i++){
		  this.rows.push('');
	  }
	  
	  this.cols = [];
	  for(var j = 0; j < 10; j++){
		  this.cols.push('');
	  }
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
					<View style={styles.lineCurrentTime}>
					</View>
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
                height: 200
        },
        col: {
				width: 40,
                borderRightColor: 'black',
                borderRightWidth: 1
        },
		lineCurrentTime: {
		   borderRightColor: 'red',
		   borderRightWidth: 2,
		   position: 'absolute',
		   top: 0,
		   left: 40,
		   width: 0,
		   height: '100%'
		}
});


