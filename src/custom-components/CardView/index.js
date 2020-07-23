import React from 'react';
import {
  StyleSheet, ScrollView, View, TouchableWithoutFeedback,
} from 'react-native';

const styles = StyleSheet.create({
  cardViewContainer: {
    flex: 1,
  },

  pager: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  pagerItem: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
  },

  pagerItemInactive: {
    backgroundColor: '#cad4d9',
  },

  pagerItemActive: {
    borderColor: '#4c4eac',
    borderWidth: 1,
  },

  pagerItemInvertInactive: {
    backgroundColor: '#fff',
  },

  pagerItemInvertActive: {
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },

  pagerInline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
  },
});

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      page: 0,
    };
  }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
    });
  }

  onScroll = (e) => {
    if (e && this.state.width) {
      const offset = e.nativeEvent.contentOffset;
      if (offset) {
        const page = Math.round(offset.x / this.state.width);
        this.setState({
          page,
        }, () => {
          if (this.props.getIndex) this.props.getIndex(page);
        });
      }
    }
  }

  onPress = (index) => {
    if (this.props.onPress) {
      this.props.onPress(index);
    }
  }

  switchPage = (page) => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo({
        x: page * this.state.width,
        y: 0,
        animated: true,
      });
    }
  }

  render() {
    const items = Array.isArray(this.props.children) ? this.props.children : [];
    return (
      <View style={styles.cardViewContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onLayout={this.onLayout}
          onScroll={this.onScroll}
          scrollEventThrottle={100}
          ref={(l) => { this.scrollViewRef = l; }}
        >
          {items.map((v, i) => (
            <TouchableWithoutFeedback key={`${i + 1}`} onPress={() => this.onPress(i)}>
              <View style={{ width: this.state.width }}>
                {v}
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
        <View style={[styles.pager, this.props.inline ? styles.pagerInline : null]}>
          {items.map((v, i) => (
            <TouchableWithoutFeedback
              key={`${i + 1}`}
              onPress={() => this.switchPage.bind(this, i)}
            >
              <View
                style={[
                  styles.pagerItem,
                  this.props.invertCircle && items.length - 1 === this.state.page ? 
                  this.state.page === i ? styles.pagerItemInvertInactive : styles.pagerItemInvertActive :
                  this.state.page === i ? styles.pagerItemActive : styles.pagerItemInactive
                ]}
              />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    );
  }
}

export default CardView;
