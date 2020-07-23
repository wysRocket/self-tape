import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import GreatImage from '../../images/icons/grandeHand.png';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/GreatStyles';

class Great extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Great"
        goBackScreen="ConfirmedSession"
      >
        <View
          style={styles.container}
        >
          <AutoHeightImage source={GreatImage} width={140} style={styles.imageStyles} />
          <Text style={styles.title}>Great!</Text>
          <Text style={styles.text}>
            You’re all set and ready to rock your audition!
            Please arrive on time and make sure you review your host when you complete your session.
            And remember to HAVE FUN!
          </Text>
        </View>
      </MainWrapper>
    );
  }
}

Great.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Great;
