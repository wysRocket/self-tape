import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../../styles/CommunitiesStyles';

export default class CommunitiesListItem extends Component {
  navigateToSubCategories = () => {
    const { navigation: { navigate }, item } = this.props;
    navigate(item.screen, { item });
  }

  render() {
    const { item: { name } } = this.props;
    return (
      <TouchableOpacity
        delayPressIn={35}
        onPress={this.navigateToSubCategories}
      >
        <View style={styles.containerListItem}>
          <Text style={styles.communityItem}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

CommunitiesListItem.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
  item: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};
