import React from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

import FinishedMap from '../Map';

import { HelveticaLight } from '../../constants/fontConstants';
import COLORS from '../../constants/colorsConstants';
import * as HELPERS from '../../helpers/textHelpers';

const { width } = Dimensions.get('window').width;

const styles = StyleSheet.create({
  containerMap: {
    marginTop: 1,
    height: 160,
  },
  mapCard: {
    width,
    backgroundColor: COLORS.MAIN_WHITE,
    margin: 15,
    marginTop: 95,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: COLORS.MAIN_GREY,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    shadowColor: COLORS.MAIN_BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 4,
    paddingLeft: 7,
    paddingRight: 7,
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  cardTextContainer: {
    marginLeft: 7,
    paddingBottom: 3,
    width: 300,
  },
  namePerson: {
    fontFamily: HelveticaLight,
    fontSize: 13,
    lineHeight: 14,
    color: COLORS.MAIN_BLACK,
  },
  addressPerson: {
    fontFamily: HelveticaLight,
    fontSize: 11,
    lineHeight: 12,
    color: COLORS.MAIN_BLACK,
  },
});

const MapWithCard = ({ session, backScreen = null }) => (
  session !== null
  && (
    <View style={styles.containerMap}>
      <FinishedMap
        location={session.details.profilePractitioner.location}
      />
      <View style={styles.mapCard}>
        <Image
          style={styles.cardImage}
          source={{ uri: backScreen === 'Schedule' ? session.details.profileClient.image : session.details.profilePractitioner.image }}
        />
        <View style={styles.cardTextContainer}>
          <Text style={styles.namePerson}>
            {backScreen === 'Schedule' ? session.details.profileClient.username.toUpperCase() : session.details.profilePractitioner.username.toUpperCase()}
          </Text>
          <Text style={styles.addressPerson}>
            {HELPERS.formatLocation(session.details.profilePractitioner.address)}
          </Text>
        </View>
      </View>
    </View>
  )
);

MapWithCard.propTypes = {
  session: PropTypes.shape({}),
  backScreen: PropTypes.string,
};

MapWithCard.defaultProps = {
  session: null,
  backScreen: null,
};

export default MapWithCard;
