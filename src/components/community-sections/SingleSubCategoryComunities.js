import React, { Component } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, Image, SectionList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { profileUpdateAttempt } from '../../actions/authorization';
import { groupByCategory } from '../../helpers/communities';
import { isMember } from '../../helpers/membership';
import RightArrow from '../../images/icons/rightArrow.png';
import Fonts from '../../constants/fontConstants';
import ImageLoading from '../../custom-components/ImageLoading';
import ModalNotMember from '../../custom-components/Modal';

import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/SingleSubCategoryComunitiesStyles';

class SingleSubCategoryComunities extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.toggleModal = () => {};
  }

  onUpdateProfile = () => {
    const { navigation: { dispatch }, profile } = this.props;
    const membershipNew = profile.membership;
    membershipNew.active = false;
    dispatch(profileUpdateAttempt({ membership: membershipNew }));
  }

  navigateToCompany= (item) => {
    const { navigation: { navigate }, profile } = this.props;
    if (isMember(profile)) {
      navigate('Company', { item });
    } else if (profile.membership.active) {
      this.onUpdateProfile();
      navigate('Company', { item });
    } else this.toggleModal();
  }

  renderCompany = item => (
    <TouchableOpacity
      key={item.name}
      delayPressIn={20}
      onPress={() => this.navigateToCompany(item)}
    >
      <View style={styles.containerCompanyItem}>
        <Text style={[styles.containerListItemName, { color: `${item.fontColor}`, fontFamily: `${Fonts[item.fontFamilyText]}` }]}>{item.name}</Text>
        <Image source={RightArrow} />
      </View>
    </TouchableOpacity>
  );

  render() {
    const { props } = this;
    const SingleItem = props.navigation.state.params.item;
    return (
      <MainWrapper
        navigation={props.navigation}
        pageName={SingleItem.name}
        goBackScreen="SubCategoryCommunities"
      >
        <View style={styles.container}>
          <View style={styles.top}>
            <ImageLoading style={styles.topIco} source={{ uri: SingleItem.image }} />
            <Text style={styles.topTitle}>
              {SingleItem.nameBreack ? SingleItem.nameBreack : SingleItem.name}
            </Text>
          </View>
          <ScrollView style={styles.companiesContainer}>
            <SectionList
              renderItem={({ item }) => this.renderCompany(item)}
              renderSectionHeader={({ section: { title } }) => (
                <View style={styles.subCategoryNameContainer}>
                  <Text style={styles.subcategoryName}>{`${title}:`}</Text>
                </View>
              )}
              sections={groupByCategory(SingleItem.companies)}
              keyExtractor={(item, index) => item + index}
            />
          </ScrollView>
        </View>
        <ModalNotMember
          {...this.props}
          title="Become a SELFTAPE PRO member to get access to communities!"
          buttonText="SIGN UP"
          backScreen="SubCategoryCommunities"
          toggleModal={(func) => { this.toggleModal = func; }}
        />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({
  authorizationReducer: {
    profile,
  },
  userDetails: { member },
}) => ({
  profile,
  member,
});
SingleSubCategoryComunities.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  profile: PropTypes.shape({}).isRequired,
  member: PropTypes.shape({}).isRequired,
};

SingleSubCategoryComunities.defaultProps = {};

export default connect(mapStateToProps)(SingleSubCategoryComunities);
