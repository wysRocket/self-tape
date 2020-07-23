import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Dimensions, Animated, PanResponder,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import styles from '../../../styles/PaymentStyles';
import CardIcon from '../../../images/icons/creditCardIcon.png';
import Checked from '../../../images/icons/checked.png';

const { width } = Dimensions.get('window');
const iconWidth = 40;
const iconWidthActions = 20;

export class SwipeCard extends Component {
  translateX = new Animated.Value(0);

  deleteWidth = new Animated.Value(0);

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (e, { dx }) => {
      if (dx < -10) return true;
      return false;
    },
    onPanResponderGrant: () => this.props.setScrollState(false),
    onPanResponderMove: (e, { dx }) => {
      if (e.nativeEvent.locationX > width / 4 && dx < 0) {
        Animated.event([null, { dx: this.translateX }]);
        Animated.timing(this.deleteWidth, {
          toValue: width - e.nativeEvent.locationX,
          duration: 100,
        }).start();
      }
    },
    onPanResponderRelease: (e, { vx, dx }) => {
      const screenWidth = width;
      if ((Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) && dx < 0) {
        Animated.timing(this.translateX, {
          toValue: dx > 0 ? screenWidth : -screenWidth,
          duration: 200,
        }).start(this.props.onDismiss);
      } else {
        Animated.spring(this.translateX, {
          toValue: 0,
          bounciness: 10,
        }).start();
        Animated.timing(this.deleteWidth, {
          toValue: 0,
          duration: 200,
        }).start();
      }
      this.props.setScrollState(true);
    },
  });

  returnButton = (card, index, isSelected) => {
    const { setActiveCard, scanCard } = this.props;
    return (
      <CustomTouchableOpacity
        style={styles.buttonStyles}
        key={card === null ? 'newCard' : `${card.last4}${index}`}
        onPressFunction={() => {
          if (card !== null) setActiveCard(card);
        }}
      >
        <Fragment>
          <View
            style={styles.singleElementWrapper}
          >
            <View style={styles.row}>
              <AutoHeightImage source={CardIcon} width={iconWidth} />
              <Text style={styles.cardNumberStyle}>{card !== null ? `**** **** **** ${card.last4}` : 'Card number'}</Text>
            </View>
            {card === null && (
              <CustomTouchableOpacity
                onPressFunction={() => scanCard()}
              >
                <Text style={styles.scanText}>
                  Scan
                </Text>
              </CustomTouchableOpacity>
            )}
            {(card !== null && isSelected)
              ? <AutoHeightImage source={Checked} width={iconWidthActions} />
              : <View style={{ width: iconWidthActions }} />
            }
          </View>
          <Animated.View style={[styles.delete, { width: this.deleteWidth }]}>
            <Text style={styles.deleteText}>Delete</Text>
          </Animated.View>
        </Fragment>
      </CustomTouchableOpacity>
    );
  }

  render() {
    const { card, index, selected } = this.props;
    const isSelected = card && selected && card.id === selected.id;
    return (
      <View>
        {card !== null && !isSelected
          ? (
            <Animated.View
              style={{
                transform: [{ translateX: this.translateX }],
              }}
              {...this.panResponder.panHandlers}
            >
              {this.returnButton(card, index, isSelected)}
            </Animated.View>
          ) : this.returnButton(card, index, isSelected)
        }
      </View>
    );
  }
}

SwipeCard.propTypes = {
  setActiveCard: PropTypes.func,
  scanCard: PropTypes.func,
  setScrollState: PropTypes.func,
  card: PropTypes.shape({}),
  index: PropTypes.number.isRequired,
  selected: PropTypes.shape({}),
};

SwipeCard.defaultProps = {
  setActiveCard: () => {},
  scanCard: () => {},
  card: null,
  selected: null,
};

export default SwipeCard;
