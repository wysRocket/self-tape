import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { StyleSheet, Text } from 'react-native';
import Block from '../../custom-components/Block';
import ValidComponent from '../../custom-components/ValidComponent';
import COLORS from '../../constants/colorsConstants';

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.MAIN_BLUE,
    padding: 15,
    alignItems: 'flex-start',
    width: 'auto',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  NotSelf: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.MAIN_GREY,
    alignItems: 'flex-start',
  },
  Message: {
    color: COLORS.MAIN_WHITE,
    fontSize: 18,
  },
  MessageNotSelf: {
    color: COLORS.BLUE_DARK,
  },
  Time: {
    fontSize: 12,
  },
});

class SingleMessage extends PureComponent {
  render() {
    const { currentUser, item } = this.props;
    const self = currentUser.uid === item.senderId;
    return (
      <ValidComponent key={`${item.timestamp}`} exist>
        <Block
          style={[styles.Container, !self && styles.NotSelf]}
        >
          <Text style={[styles.Message, !self && styles.MessageNotSelf]}>{item.message}</Text>
          <Text style={[styles.Message, styles.Time, !self && styles.MessageNotSelf]}>
            {`${moment(item.timestamp + new Date().getTimezoneOffset()).format('hh:mm A')}`}
          </Text>
        </Block>
      </ValidComponent>
    );
  }
}

SingleMessage.propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({}).isRequired,
};

export default SingleMessage;
