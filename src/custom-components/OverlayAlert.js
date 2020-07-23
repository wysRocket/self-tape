import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Overlay } from 'react-native-elements';
import ValidComponent from './ValidComponent';
import { SizeConstant } from '../helpers/index';
import COLORS from '../constants/colorsConstants';
import CheckIcon from '../images/icons/CheckIcon.png';
import CancelIcon from '../images/icons/CancelIcon.png';

const styles = StyleSheet.create({
  OverlayContentContainer: {
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  OverlayButton: {
    padding: 10,
    alignContent: 'stretch',
    alignSelf: 'flex-end',
  },

  OverlayCancelButton: {
    padding: 10,
    alignContent: 'stretch',
    marginRight: 'auto',
  },

  OverlaySeparator: {
    width: '100%',
    height: 8,
    backgroundColor: 'transparent',
  },

  OverlayMessagesText: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  Content: {
    paddingHorizontal: 11,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  Image: {
    tintColor: '#fff',
  },
});


const Separator = () => (<View style={styles.OverlaySeparator} />);

class OverlayAlert extends PureComponent {
  initialState = {
    isVisible: false,
    overlayBackgroundColor: COLORS.MAIN_BLUE,
    onPress: () => {},
    message: '',
    leftButton: () => null,
    cancel: false,
  }

  state = {
    ...this.initialState,
  }

  showOverlay = (params = this.initialState) => {
    const state = { isVisible: true, ...params };
    this.setState(state);
  }

  hiddenOverlay = () => {
    this.state.onPress();
    this.setState(this.initialState);
  }

  onBackdropPress = () => {
    if (!this.state.cancel) this.state.onPress();
    this.setState(this.initialState);
  }

  render() {
    const {
      isVisible,
      overlayBackgroundColor,
      message,
    } = this.state;
    return (
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(0,0,0,0.6)"
        overlayBackgroundColor={overlayBackgroundColor}
        onBackdropPress={this.onBackdropPress}
        width={SizeConstant.ScreenWidth - 68}
        height="auto"
        borderRadius={7}
      >
        <View style={styles.OverlayContentContainer}>
          <Text style={styles.OverlayMessagesText}>
            {message}
          </Text>

          <Separator />

          <View style={styles.Content}>
            <ValidComponent exist={this.state.cancel}>
              <TouchableOpacity style={styles.OverlayCancelButton} onPress={this.onBackdropPress}>
                <AutoHeightImage style={styles.Image} width={13.26} source={CancelIcon} />
              </TouchableOpacity>
            </ValidComponent>
            <ValidComponent exist={this.state.leftButton}>
              {this.state.leftButton(() => this.setState(this.initialState))}
            </ValidComponent>
            <TouchableOpacity style={styles.OverlayButton} onPress={this.hiddenOverlay}>
              <AutoHeightImage style={styles.Image} width={17} source={CheckIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    );
  }
}

export default OverlayAlert;
