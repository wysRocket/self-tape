import React from 'react';
import Tooltip from 'rne-modal-tooltip';
import {
  Text, Image, View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';

import Information from '../../../images/icons/information.png';
import COLORS from '../../../constants/colorsConstants';
import { HelveticaLight } from '../../../constants/fontConstants';

const styles = StyleSheet.create({
  costWrapper: {
    borderBottomWidth: 2,
    borderColor: '#e9eff2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginHorizontal: 5,
  },
  Container: {
    width: '100%',
    justifyContent: 'space-between',
  },
  costTime: {
    fontWeight: '800',
    fontSize: 17,
  },
  cost: {
    fontWeight: '600',
    fontSize: 14,
  },
  selectedText: {
    color: COLORS.COLOR_BLUE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  InfoIcon: {
    width: 22,
    height: 22,
    marginLeft: 4,
    tintColor: COLORS.COLOR_BLUE,
  },
  InfoButton: {
  },
  PopoverText: {
    fontSize: 13,
    color: COLORS.MAIN_BLACK,
    fontFamily: HelveticaLight,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  PopoverContainer: {
    padding: 7,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});


const SingleCost = ({
  price, selectedPrice, service, onSelectPrice,
}) => {
  const selected = selectedPrice && selectedPrice.uid === price.uid;
  return (
    <CustomTouchableOpacity
      key={`${price.duration}${price.name}`}
      onPressFunction={() => onSelectPrice(price)}
      styles={styles.costWrapper}
    >
      <View style={[styles.row, styles.Container]}>
        <View style={[styles.row, { width: '80%' }]}>
          <Text
            numberOfLines={2}
            style={[styles.costTime, selected && styles.selectedText]}
          >
            {price.name}
          </Text>
          {service && price.description !== '' && (
            <Tooltip
              popover={(
                <Text
                  numberOfLines={4}
                  style={styles.PopoverText}
                >
                  {price.description}
                </Text>
              )}
              height={price.description.length <= 25 ? 30 : 75}
              withOverlay={false}
              backgroundColor={COLORS.COLOR_GREY_CFCFC}
              containerStyle={styles.PopoverContainer}
            >
              <Image source={Information} style={styles.InfoIcon} />
            </Tooltip>
          )}
        </View>
        <Text style={[styles.cost, selected && styles.selectedText]}>
          {`$${price.value.toString()}`}
        </Text>
      </View>
    </CustomTouchableOpacity>
  );
};

SingleCost.propTypes = {
  price: PropTypes.shape({}),
  selectedPrice: PropTypes.shape({}),
  onSelectPrice: PropTypes.func.isRequired,
  service: PropTypes.bool,
};

SingleCost.defaultProps = {
  price: null,
  selectedPrice: null,
  service: false,
};


export default SingleCost;
