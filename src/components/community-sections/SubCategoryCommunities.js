import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/SubCategoryCommunitiesStyles';

class SubCategoryCommunities extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  navigateToSingleSunCategory = (item) => {
    const { navigation: { navigate } } = this.props;
    navigate('SingleSubCategoryComunities', { item });
  }

  colorText = (item) => {
    this.setState({ [item]: true });
  }

  resetText = (item) => {
    this.setState({ [item]: false });
  }

  textColored = (item) => {
    if (this.state[item]) {
      return styles.containerListItemNameColored;
    } return styles.containerListItemName;
  }

  renderSubcategories() {
    const {
      communities,
    } = this.props;
    return communities.map((item, index) => (
      <TouchableWithoutFeedback
        key={`${item.name}${index + 1}`}
        delayPressIn={20}
        onPressIn={() => this.colorText(`${index}textColored`)}
        onPressOut={() => this.resetText(`${index}textColored`)}
        onPress={() => this.navigateToSingleSunCategory(item)}
      >
        <View style={styles.containerListItem}>
          <Text style={this.textColored(`${index}textColored`)}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    ));
  }

  render() {
    const { communities, navigation } = this.props;
    const { name } = navigation.state.params.item;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Communities List"
        goBackScreen="Home"
        // goBackScreen="HomeCommunities"
      >
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.topTitle}>{name}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.SubCategoryContainer}>
            {
              communities.length > 0 ?
              this.renderSubcategories() :
              <Text>No data</Text>
            }
          </ScrollView>
        </View>
      </MainWrapper>
    );
  }
}

SubCategoryCommunities.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  communities: PropTypes.arrayOf(PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        item: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    }),
  })),
};

SubCategoryCommunities.defaultProps = {
  communities: [],
};

const mapStateToProps = ({
  communitiesReducer: { communities },
}) => ({
  communities,
});

export default connect(mapStateToProps)(SubCategoryCommunities);
