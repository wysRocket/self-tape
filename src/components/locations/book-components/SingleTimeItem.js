import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from '../../../styles/SingleTimeStyles';

export default class SingleTimeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutesArray: [
        {
          minutes: '00',
          exist: false,
        }, {
          minutes: '15',
          exist: false,
        }, {
          minutes: '30',
          exist: false,
        }, {
          minutes: '45',
          exist: false,
        },
      ],
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const {
      item, selectedElementTime, index, onTimeChange, active, alreadyPicked,
    } = this.props;
    const { minutesArray } = this.state;
    const propsChanged = (
      !_.isEqual(item, nextProps.item)
      || !_.isEqual(selectedElementTime, nextProps.selectedElementTime)
      || !_.isEqual(index, nextProps.index)
      || !_.isEqual(onTimeChange, nextProps.onTimeChange)
      || !_.isEqual(active, nextProps.active)
      || !_.isEqual(alreadyPicked, nextProps.alreadyPicked)
    );

    const stateChanged = (
      !_.isEqual(minutesArray, nextState.minutesArray)
    );

    return propsChanged || stateChanged;
  }

  changeStatus = (index) => {
    const minutes = this.state.minutesArray;
    minutes[index].exist = true;
    this.setState({ minutesArray: minutes });
  }

  returnStatusLine = () => {
    const { alreadyPicked, item } = this.props;
    const minutesArray = ['00', '15', '30', '45'];
    let exist = false;
    return (
      minutesArray.map((elem, index) => {
        if (alreadyPicked) {
          exist = alreadyPicked.hourses.find(el => moment(el).format('hh:mm A') === `${item.time}:${elem} ${item.period}`);
          if (exist) this.changeStatus(index);
        }
        return (
          <View
            key={elem}
            style={[styles.statusItem, exist && styles.exist]}
          />
        );
      })
    );
  }

  render() {
    const {
      item, selectedElementTime, index, onTimeChange, active,
    } = this.props;
    const { minutesArray } = this.state;
    return (
      <TouchableOpacity
        onPress={() => onTimeChange(index, minutesArray)}
        disabled={!active}
        delayPressIn={20}
      >
        <View style={styles.container}>
          <Text style={[styles.time, !active && styles.disabled]}>{item.time}</Text>
          <Text style={[styles.period, !active && styles.disabled]}>{item.period}</Text>
          <View style={[styles.statusContainer, selectedElementTime === index && styles.active]}>
            {selectedElementTime === index && this.returnStatusLine()}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

SingleTimeItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  selectedElementTime: PropTypes.number,
  index: PropTypes.number.isRequired,
  alreadyPicked: PropTypes.shape({}),
  onTimeChange: PropTypes.func,
  active: PropTypes.bool.isRequired,
};

SingleTimeItem.defaultProps = {
  selectedElementTime: null,
  alreadyPicked: null,
  onTimeChange: () => {},
};
