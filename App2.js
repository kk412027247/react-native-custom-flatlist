import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Animated, Dimensions, RefreshControl} from 'react-native';

import RnCustomFlatList from './rnCustomeFlatList';
const {width} = Dimensions.get('screen');


const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];


export default class App2 extends Component {

  state={
    refreshing: false,
  };
  _renderItem = ({item,index}) => <View style={styles['item'+ index%4]}><Text>{item}</Text></View> ;

  _keyExtractor = (item, index) => item + index + ''     ;

  _header = () => <Text style={styles.title}>some text</Text> ;

  _onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => this.setState({ refreshing: false }), 1000);
  };

  render(){
    return(
      <View style={styles.container}>
        <RnCustomFlatList
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          data={data}
          Header={this._header}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          headerHeight={150}
        />
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title:{
    fontSize:30,
    fontWeight: 'bold',
  } ,
  item0:{
    width:'100%',
    height:70,
    backgroundColor:'#47e9ff'
  }  ,
  item1:{
    width,
    height:70,
    backgroundColor:'#e9ff98'
  }  ,
  item2:{
    width,
    height:70,
    backgroundColor:'#ff8edf'
  } ,
  item3:{
    width,
    height:70,
    backgroundColor:'#6354ff'
  } ,
});
