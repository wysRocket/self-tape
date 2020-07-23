import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { connect } from 'react-redux';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import SelectPayment from '../../custom-components/SelectPayment';
import { getDetailsAttempt } from '../../actions/userDetails';

import { isMember } from '../../helpers/membership';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/PricingStyles';
import cameraIcon from '../../images/icons/camIcon.png';

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedPlan: null,
    };
  }

  componentDidMount() {
    const { navigation: { dispatch } } = this.props;
    dispatch(getDetailsAttempt());
  }

  setMembership(plan) {
    const { member, navigation: { navigate } } = this.props;
    if (!member) {
      navigate('Membership', { plan, backScreen: 'Pricing' });
    } else {
      this.setState({ selectedPlan: plan }, () => {
        this.toggleModal();
      });
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));
  }

  renderSingleText = ({ text }) => (
    <View style={styles.containerSingleText}>
      <AutoHeightImage source={cameraIcon} width={styles.image.width} style={styles.image} />
      <Text style={styles.singleText}>{text}</Text>
    </View>
  )

  renderPlan = (plan, index) => {
    const { profile, selftapePro } = this.props;
    const firstOrLast = (selftapePro.length - 1 === index && index % 2 === 0)
      || selftapePro.length === 1;
    const needBorder = (selftapePro.length - 1 !== index && index % 2 === 0);
    return (
      <View
        style={[
          !firstOrLast && { width: '50%' },
          needBorder && { borderRightWidth: 1, borderColor: 'grey' },
        ]}
      >
        <View style={styles.planContainer} key={`${plan.price.cost}${plan.price.subCost}${plan.price.period}`}>
          <View style={[styles.topTitleContainer, { backgroundColor: plan.color }]}>
            <Text style={styles.topTitle}>{plan.title}</Text>
          </View>
          <View style={styles.costWrapper}>
            <View style={styles.costContainer}>
              <Text style={[styles.textStyle, styles.currency]}>$</Text>
              <Text style={[styles.textStyle, styles.cost]}>{plan.price.cost}</Text>
              {plan.price.subCost !== '' && <Text style={[styles.textStyle, styles.dot]}>.</Text>}
              <Text style={[styles.textStyle, styles.subCost]}>{plan.price.subCost}</Text>
              <Text style={[styles.textStyle, styles.slesh]}>/</Text>
              <Text style={[styles.textStyle, styles.period]}>{plan.price.period}</Text>
            </View>
            <Text style={styles.costSubTitle}>{plan.subTitle}</Text>
          </View>
          <TouchableOpacity
            disabled={isMember(profile)}
            style={[styles.button, (isMember(profile)) && { backgroundColor: 'grey' }]}
            onPress={() => this.setMembership(plan)}
          >
            <Text style={styles.buttonText}>Purchase</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {
      selftapePro, isLoading, isLoadingPayment, navigation,
      profile,
    } = this.props;
    const { isModalVisible, selectedPlan } = this.state;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="SELFTAPE PRO"
        goBackScreen="Home"
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.containerContent}
        >
          <View style={styles.topContainer}>
            <Text style={styles.pageTitle}>Selftape Pro</Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.membership}>Membership</Text>
          </View>
          <View style={styles.middleContainer}>
            {this.renderSingleText({ text: 'NO SERVICE FEE!' })}
            {this.renderSingleText({ text: 'EXCLUSIVE INDUSTRY ADVICE!' })}
            {this.renderSingleText({ text: 'PREMIUM AFFILIATE DEALS!' })}
            {this.renderSingleText({ text: 'MEMBERS ONLY EVENTS!' })}
          </View>
          <FlatList
            data={selftapePro}
            extraData={profile}
            onEndReachedThreshold={0.2}
            numColumns={2}
            contentContainerStyle={styles.bottomContainer}
            keyExtractor={(item, index) => index}
            renderItem={elem => this.renderPlan(elem.item, elem.index)}
          />
        </ScrollView>
        <SelectPayment
          isModalVisible={isModalVisible}
          toggleModal={this.toggleModal}
          selectedPlan={selectedPlan}
        />
        <CustomActivityIndicator text="No prices found" isLoading={isLoadingPayment || isLoading} showNoData={selftapePro === null} />
      </MainWrapper>
    );
  }
}

Pricing.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  selftapePro: PropTypes.arrayOf(PropTypes.shape({})),
  profile: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingPayment: PropTypes.bool.isRequired,
  member: PropTypes.shape({}),
};

Pricing.defaultProps = {
  selftapePro: null,
  member: null,
};

const mapStateToProps = ({
  userDetails: { selftapePro, isLoading, member },
  authorizationReducer: { profile },
  paymentReducer: { isLoadingPayment },
}) => ({
  selftapePro,
  isLoading,
  profile,
  member,
  isLoadingPayment,
});

export default connect(mapStateToProps)(Pricing);
