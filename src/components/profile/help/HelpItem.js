import React, { Component } from 'react';
import {
  Text, View, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import styles from '../../../styles/HelpStyles';
import Arrow from '../../../images/icons/rightArrow.png';

export default class HelpItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { title, borderBottom, onPressFunction } = this.props;
    return (
      <CustomTouchableOpacity
        styles={styles.containerItemTouchable}
        onPressFunction={onPressFunction}
      >
        <View style={[
          styles.containerItem,
          { borderBottomWidth: borderBottom === true ? 1 : 0 }]}
        >
          <Text style={styles.containerItemTitle}>{title}</Text>
          <Image source={Arrow} />
        </View>
      </CustomTouchableOpacity>
    );
  }
}

HelpItem.propTypes = {
  title: PropTypes.string.isRequired,
  borderBottom: PropTypes.bool,
  onPressFunction: PropTypes.func,
};

HelpItem.defaultProps = {
  borderBottom: true,
  onPressFunction: () => {},
};
