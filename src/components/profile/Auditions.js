import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAuditionsAttempt, refreshAuditionsAttempt } from '../../actions/auditions';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';

import MainWrapper from '../../share/MainWrapper';
import RightArrow from '../../images/icons/rightArrow.png';
import styles from '../../styles/AuditionsStyles';

class Auditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    const { navigation: { dispatch } } = this.props;
    dispatch(getAuditionsAttempt());
  }

  onRefreshAuditions = () => {
    const { navigation: { dispatch } } = this.props;
    dispatch(refreshAuditionsAttempt());
  }

  goPlayVideo = (item) => {
    const { navigation } = this.props;
    navigation.navigate('VideoPlay', { item, backScreen: 'Auditions' });
  }

  renderAuditions = articles => articles.map(item => (
    <TouchableOpacity
      key={item.name}
      delayPressIn={20}
      onPress={() => this.goPlayVideo(item)}
    >
      <View style={styles.singleItem}>
        <Text style={styles.singleItemText}>{item.name}</Text>
        <Image style={styles.singleItemImage} source={RightArrow} />
      </View>
    </TouchableOpacity>
  ));

  render() {
    const {
      auditions, navigation, isLoading, isRefreshing,
    } = this.props;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Auditions"
        goBackScreen="Profile"
      >
        <ScrollView
          style={styles.auditionsContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefreshAuditions}
            />
          }
        >
          {auditions && this.renderAuditions(auditions)}
        </ScrollView>
        <CustomActivityIndicator text="No auditions found" isLoading={isLoading} showNoData={auditions === null} />
      </MainWrapper>
    );
  }
}

Auditions.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  auditions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
};

Auditions.defaultProps = {
  auditions: null,
};

const mapStateToProps = ({
  auditionsReducer: {
    auditions,
    isLoading,
    isRefreshing,
  },
}) => ({
  auditions,
  isLoading,
  isRefreshing,
});

export default connect(mapStateToProps)(Auditions);
