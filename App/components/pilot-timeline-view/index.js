

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
      this.state = {showChangeLog: false}
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
					<Row><Col><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim posuere fringilla. Duis vitae viverra leo. Donec fermentum ante at elit egestas, quis venenatis risus luctus. Curabitur feugiat sit amet ligula a rutrum. Nulla fermentum id nisi quis sodales. Mauris efficitur pulvinar enim, nec elementum libero gravida vitae. Ut maximus finibus diam. Sed faucibus nulla et volutpat cursus. Integer vitae justo sed turpis suscipit accumsan. Curabitur metus ante, maximus sed pulvinar at, laoreet sit amet urna. Morbi ullamcorper dui mi, sed finibus sem accumsan eu. Donec accumsan ultrices nunc sed convallis.</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
					<Row><Col><Text>Row 1, Col 1</Text></Col><Col><Text>Row 1, Col 2</Text></Col></Row>
				</Grid>
			</ScrollView>
		</ScrollView>
        
      </View>
    );
  }
}


