import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Calendar } from 'react-native-calendars';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/ActivityStyles';
import BackImage from '../../images/profile/profileBackground.png';
import Fire from '../../images/icons/fire.png';
import Time from '../../images/icons/time.png';
import Lightning from '../../images/icons/lightning.png';

export default class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MainWrapper
        navigation={this.props.navigation}
        pageName="Session Tracker"
        goBackScreen="Home"
        // goBackScreen="HomeCommunities"
      >
        <View
          style={styles.container}
        >
          <ImageBackground style={styles.containerBackground} source={BackImage}>
            <View style={styles.calendarContainer}>
              <Calendar
                selectedDate="2018-04-20"
                markedDates={{
                  '2018-04-16': { selected: true, selectedColor: '#06d376' },
                  '2018-04-17': { selected: true, selectedColor: '#06d376' },
                  '2018-04-18': { selected: true, selectedColor: '#06d376' },
                  '2018-04-20': { selected: true, selectedColor: '#06d376' },
                  '2018-04-26': { selected: true, selectedColor: '#06d376' },
                  '2018-05-16': { selected: true, selectedColor: '#06d376' },
                  '2018-05-17': { selected: true, selectedColor: '#06d376' },
                  '2018-05-18': { selected: true, selectedColor: '#06d376' },
                  '2018-05-20': { selected: true, selectedColor: '#06d376' },
                  '2018-05-23': { selected: true, selectedColor: '#06d376' },
                  '2018-06-16': { selected: true, selectedColor: '#06d376' },
                  '2018-06-13': { selected: true, selectedColor: '#06d376' },
                  '2018-06-14': { selected: true, selectedColor: '#06d376' },
                  '2018-06-19': { selected: true, selectedColor: '#06d376' },
                  '2018-06-26': { selected: true, selectedColor: '#06d376' },
                  '2018-07-16': { selected: true, selectedColor: '#06d376' },
                  '2018-07-17': { selected: true, selectedColor: '#06d376' },
                  '2018-07-18': { selected: true, selectedColor: '#06d376' },
                  '2018-07-20': { selected: true, selectedColor: '#06d376' },
                  '2018-07-26': { selected: true, selectedColor: '#06d376' },
                }}
                onPressArrowLeft={substractMonth => substractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                style={{ backgroundColor: 'transparent' }}
                theme={
                  {
                    arrowColor: 'white',
                    color: 'white',
                    'stylesheet.calendar.header': {
                      header: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: -12,
                        alignItems: 'center',
                        width: '105%',
                      },
                      monthText: {
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '400',
                      },
                      dayHeader: {
                        marginTop: 2,
                        marginBottom: 7,
                        width: 32,
                        color: 'white',
                        fontSize: 12,
                      },
                      week: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',

                      },
                    },
                    'stylesheet.calendar.main': {
                      monthView: {
                        backgroundColor: 'transparent',
                      },
                      week: {
                        marginTop: 1,
                        marginBottom: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      },
                    },
                    'stylesheet.day.basic': {
                      text: {
                        marginTop: Platform.OS === 'android' ? 3 : 5,
                        fontSize: 18,
                        color: 'white',
                      },
                    },
                  }
                }
              />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoContainerItem}>
                <Image style={styles.infoContainerItemImage} source={Fire} />
                <Text style={styles.infoContainerTitle}>longest streak</Text>
                <Text style={styles.infoContainerStreackCount}>9 days</Text>
              </View>
              <View style={styles.infoContainerTimeAuditing}>
                <Image style={styles.infoContainerItemImageTimer} source={Time} />
                <Text style={styles.infoContainerTitle}>time auditing</Text>
                <Text style={styles.infoContainerAuditingCount}>3h 25m</Text>
              </View>
              <View style={styles.infoContainerItem}>
                <Image style={styles.infoContainerItemImage} source={Lightning} />
                <Text style={styles.infoContainerTitle}>total sessions</Text>
                <Text style={styles.infoContainerSessionsCount}>54</Text>
              </View>
            </View>
            <View style={styles.controlSessionsButtons}>
              <TouchableOpacity delayPressIn={20}>
                <Text style={styles.controlSessionsButtonsText}>Session History</Text>
              </TouchableOpacity>
              <TouchableOpacity delayPressIn={20}>
                <Text style={styles.controlSessionsButtonsText}>Add Session</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </MainWrapper>
    );
  }
}

Activity.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

Activity.defaultProps = {};
