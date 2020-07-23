import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ScrollView, View, Text, Image, TouchableOpacity, RefreshControl,
} from 'react-native';
import moment from 'moment';

import MainWrapper from '../../share/MainWrapper';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import ImageLoading from '../../custom-components/ImageLoading';
import ModalNotMember from '../../custom-components/Modal';
import { getTipsAttempt, refreshTipsAttempt } from '../../actions/tips';
import { profileUpdateAttempt } from '../../actions/authorization';

import RightArrow from '../../images/icons/rightArrow.png';
import toolsAndTips from '../../mockup/toolsAndTips';
import styles from '../../styles/ToolsAndTipsStyles';

class ToolsAndTips extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.toggleModal = () => {};
  }

  componentDidMount = () => {
    const { navigation: { dispatch } } = this.props;
    dispatch(getTipsAttempt());
  }

  onRefreshTips = () => {
    const { navigation: { dispatch } } = this.props;
    dispatch(refreshTipsAttempt());
  }

  onUpdateProfile = () => {
    const { navigation: { dispatch }, profile } = this.props;
    const membershipNew = profile.membership;
    membershipNew.active = false;
    dispatch(profileUpdateAttempt({ membership: membershipNew }));
  }

  goPlayVideo = (item) => {
    const { navigation: { navigate }, profile: { membership } } = this.props;
    const endDate = new Date(membership.dateEnd);
    if (endDate !== '' && moment().isBefore(moment(endDate))) {
      navigate('VideoPlay', { item, backScreen: 'ToolsAndTips' });
    } else if (membership.active) {
      this.onUpdateProfile();
      navigate('VideoPlay', { item, backScreen: 'ToolsAndTips' });
    } else this.toggleModal();
  }

  renderToolsAndTips = () => {
    const { tips } = this.props;
    return tips.map(item => (
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
  }

  render() {
    const {
      navigation, isLoading, tips, isRefreshing,
    } = this.props;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Insight"
        goBackScreen="Home"
        // goBackScreen="HomeCommunities"
      >
        <View style={styles.container}>
          <View style={styles.top}>
            <ImageLoading style={styles.topImage} source={{ uri: toolsAndTips[0].image }} />
          </View>
          <ScrollView
            style={styles.toolsAndTipsContainer}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={this.onRefreshTips}
              />
            }
          >
            {this.renderToolsAndTips()}
          </ScrollView>
        </View>
        <ModalNotMember
          {...this.props}
          title="Become a SELFTAPE PRO member to get tons of tips!"
          buttonText="SIGN UP"
          backScreen="ToolsAndTips"
          toggleModal={(func) => { this.toggleModal = func; }}
        />
        <CustomActivityIndicator text="No data found" isLoading={isLoading} showNoData={tips === [] || tips === null} />
      </MainWrapper>
    );
  }
}

ToolsAndTips.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  profile: PropTypes.shape({}).isRequired,
  tips: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  member: PropTypes.shape({}),
};

ToolsAndTips.defaultProps = {
  member: null,
};

const mapStateToProps = ({
  tipsReducer: {
    tips,
    isLoading,
    isRefreshing,
  },
  userDetails: { member },
  authorizationReducer: {
    profile,
  },
}) => ({
  tips,
  isLoading,
  isRefreshing,
  profile,
  member,
});

export default connect(mapStateToProps)(ToolsAndTips);
