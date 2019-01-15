import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Animated, Dimensions, RefreshControl} from 'react-native';
const {width} = Dimensions.get('screen');
const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const HEADER_MAX_HEIGHT = 150;


export default class App extends Component {

  state={
    scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
    onRefresh: false,
  };

  _renderItem = ({item,index}) => <View style={styles['item'+ index%4]}><Text>{item}</Text></View> ;

  _keyExtractor = (item, index) => item + index + ''     ;

  _onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => this.setState({ refreshing: false }), 1000);
  };


  render() {

    const scrollY = Animated.add(this.state.scrollY, Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0);

    const headerTranslate = scrollY.interpolate({
      inputRange:[0, HEADER_MAX_HEIGHT],
      outputRange:[0, -HEADER_MAX_HEIGHT],
      extrapolate:'clamp'
    });

    const headerStyle = [styles.header,{
      transform:[{translateY: headerTranslate}]
    }];

    const subheaderTranslate = scrollY.interpolate({
      inputRange:[0, HEADER_MAX_HEIGHT],
      outputRange:[0, HEADER_MAX_HEIGHT / 3 * 2],
      extrapolate:'clamp'
    });

    const subHeaderOpacity =  scrollY.interpolate({
      inputRange:[0, HEADER_MAX_HEIGHT/2, HEADER_MAX_HEIGHT],
      outputRange:[1, 1, 0],
      extrapolate:'clamp'
    });

    const subHeaderStyle = [styles.subHeader,{
      transform:[{translateY: subheaderTranslate}],
      opacity:subHeaderOpacity,
    }];

    const contentInset =  {
      top: HEADER_MAX_HEIGHT,
    };

    const contentOffset = {
      y: -HEADER_MAX_HEIGHT,
    };

    return (
      <View style={styles.container}>
        <Animated.View style={headerStyle} pointerEvents="none">
          <Animated.View style={subHeaderStyle} pointerEvents="none">
            <Text style={styles.title}>some text</Text>
          </Animated.View>
        </Animated.View>
        <AnimatedFlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          contentInset={contentInset}
          contentOffset={contentOffset}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainerStyle:{
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,

  },
  header:{
    width:'100%',
    height:150,
    backgroundColor:'#fff' ,
    position: 'absolute',
    top:0,
  },
  subHeader:{
    flex:1,
    backgroundColor: '#ff6e7f',
    justifyContent: 'center',
    alignItems: 'center',
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
