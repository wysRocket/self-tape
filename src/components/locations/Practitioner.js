import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPractitioner } from '../../actions/book';
import ImageLoading from '../../custom-components/ImageLoading';
import styles from '../../styles/PractitionerStyles';
import RightArrow from '../../images/icons/rightArrow.png';

class Practitioner extends Component {
  navigateToBook = (practitioner) => {
    const { navigation: { dispatch } } = this.props;
    dispatch(setPractitioner(practitioner));
  }

  render() {
    const { practitioner } = this.props;
    return (
      <TouchableOpacity
        delayPressIn={20}
        onPress={() => this.navigateToBook(practitioner)}
      >
        <View style={styles.container}>
          <View style={styles.containerLeft}>
            <ImageLoading style={styles.practitionerAvatar} source={{ uri: practitioner.image }} />
            <Text> {practitioner.username}</Text>
          </View>
          <Image source={RightArrow} />
        </View>
      </TouchableOpacity>
    );
  }
}

Practitioner.propTypes = {
  navigation: PropTypes.shape({}),
  location: PropTypes.shape({}).isRequired,
  practitioner: PropTypes.shape({}).isRequired,

};

Practitioner.defaultProps = {
  navigation: {},
};


const mapStateToProps = ({
  bookReducer: {
    location,
  },
}) => ({
  location,
});

export default connect(mapStateToProps)(Practitioner);
