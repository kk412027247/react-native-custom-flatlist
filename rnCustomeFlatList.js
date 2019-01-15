import {Component} from "react";
import {Animated,  FlatList, Platform, StyleSheet, View} from "react-native";
import React from "react";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


export default class RnCustomFlatList extends Component {

  state = {
    scrollY: new Animated.Value(Platform.OS === 'ios' ? -this.props.headerHeight : 0),
  };

  render() {

    const HEADER_MAX_HEIGHT = this.props.headerHeight;

    const scrollY = Animated.add(this.state.scrollY, Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0);

    const headerTranslate = scrollY.interpolate({
      inputRange:[0, HEADER_MAX_HEIGHT],
      outputRange:[0, -HEADER_MAX_HEIGHT],
      extrapolate:'clamp'
    });

    const headerStyle = [styles.header,{
      height: HEADER_MAX_HEIGHT,
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

    const contentContainerStyle = {
      paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,

    };


    const {renderItem, keyExtractor, data, Header,refreshing, onRefresh } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={headerStyle} pointerEvents="none">
          <Animated.View style={subHeaderStyle} pointerEvents="none">
            <Header/>
          </Animated.View>
        </Animated.View>
        <AnimatedFlatList
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          data={data}
          contentContainerStyle={contentContainerStyle}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
       
          refreshing={refreshing}
          onRefresh={onRefresh}
          // Android offset for RefreshControl
          progressViewOffset={HEADER_MAX_HEIGHT}
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
  header:{
    width:'100%',
    
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
});
