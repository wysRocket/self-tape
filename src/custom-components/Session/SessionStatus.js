import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import AutoHeighImage from 'react-native-auto-height-image';

import { HelveticaLight } from '../../constants/fontConstants';
import { locale } from '../../constants/textConstants';
import COLORS from '../../constants/colorsConstants';

const styles = StyleSheet.create({
  containerTop: {
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 15,
    marginHorizontal: 10,
  },
  status: {
    fontFamily: HelveticaLight,
    fontSize: 11,
    color: COLORS.MAIN_BLUE,
  },
  when: {
    fontFamily: HelveticaLight,
    fontSize: 19,
    lineHeight: 19,
    fontWeight: '300',
    marginTop: 5,
    color: COLORS.MAIN_BLACK,
  },
});

const SessionStatus = ({ session }) => (
  session !== null
  && (
    <View style={styles.containerTop}>
      <View>
        <Text style={styles.status}>{session.status.toUpperCase()}</Text>
        <Text style={styles.when}>
          {`${moment(session.selectedTime.dateTime).format('ddd, MMM DD, YYYY, hh:mm A').toUpperCase()}`}
        </Text>
      </View>
    </View>
  )
);

SessionStatus.propTypes = {
  session: PropTypes.shape({}),
};

SessionStatus.defaultProps = {
  session: null,
};

export default SessionStatus;
