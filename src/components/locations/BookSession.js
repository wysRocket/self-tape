import React, { Component, Fragment } from 'react';
import {
  View,
  Animated,
  Modal,
  ActivityIndicator,
  AppState,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';
import { Agenda } from 'react-native-calendars';

import MainWrapper from '../../share/MainWrapper';
import PractitionerInfo from './book-components/PractitionerInfo';
import BookMap from './book-components/BookMap';
import TimePicker from './book-components/TimePicker';
import BookButton from './book-components/BookButton';
import SessionsAndService from './book-components/SessionsAndServices';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';

import * as helpers from '../../helpers/sessions';
import { SESSIONS_STATUSES } from '../../constants/apiConstants';
import { hasStripeAccount } from '../../helpers/membership';
import Calculation from '../../helpers/calculation';

import { getSessionsAttempt, createSessionsAttempt } from '../../actions/sessions';
import { setTimeDate, toggleMinutesPopup, setAuditionDetails } from '../../actions/book';
import { showAlert } from '../../actions/errors';

import styles, { agendaStyle } from '../../styles/BookSessionStyles';

const minMap = 70;
const maxMap = 200;
const allowDate = new Date();
const combinedSelectedTime = new Date();
const offset = combinedSelectedTime.getTimezoneOffset() * 60000;

class BookSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedElementTime: null,
      selectedTime: [],
      selectedDate: moment().format('YYYY-MM-DD'),
      selectedPrice: null,
      timline: [],
      imagePreview: false,
      imagePreviewIndex: 0,
      markedDates: {},
      totalPrice: 0,
      disabledDays: {},
      minutesArray: [],
      changeDefaultCard: false,
      disablePay: false,
    };

    const { profile, practitioner } = props;
    this.calculation = new Calculation({
      buyerProfile: profile,
      sellerProfile: practitioner,
    });
    this.mapFlex = new Animated.Value(minMap);
  }

  componentDidMount = () => {
    const {
      dispatch,
      practitioner, location: { uid },
    } = this.props;
    const findData = {
      itemId: practitioner.uid,
      role: 'user',
      locationId: uid,
      startDate: null,
      endDate: null,
    };
    dispatch(getSessionsAttempt(findData));
    AppState.addEventListener('change', this.handleAppStateChange);
    this.timeArray();
  }

  componentWillUnmount() {
    const { navigation: { dispatch } } = this.props;
    AppState.removeEventListener('change', this.handleAppStateChange);
    dispatch(toggleMinutesPopup({ visibleMinutesPopup: false }));
  }

  componentWillReceiveProps = (nextProps) => {
    this.getMarkedDates(nextProps);
  }

  handleAppStateChange = (nextAppState) => {
    const { navigation: { dispatch } } = this.props;
    if (nextAppState.match(/inactive|background/)) {
      dispatch(toggleMinutesPopup({ visibleMinutesPopup: false }));
    }
  };

  onChangeDefaultCard = () => {
    this.setState(prevState => ({ changeDefaultCard: !prevState.changeDefaultCard }));
  }

  toggleDisablePay = value => this.setState({ disablePay: value });

  onTimeChange = (selectedElementTime, minutesArray) => {
    this.toggleDisablePay(false);
    const { selectedDate, selectedPrice } = this.state;
    const { practitioner, navigation: { dispatch } } = this.props;
    const { time, period } = this.state.timline[selectedElementTime];
    const selected = new Date(new Date(selectedDate).getTime() + offset);
    const converted24 = helpers.convertTime12to24(`${time} ${period}`);
    selected.setHours(converted24.hours);
    const canSelect = helpers.checkIfWorkHours({
      practitioner,
      selectedTime: {
        selectedPrice,
        dateTime: selected,
      },
      selectedPrice,
    });
    if (canSelect) {
      const { visibleMinutesPopup } = this.props;
      if (!visibleMinutesPopup) {
        dispatch(toggleMinutesPopup({
          visibleMinutesPopup: minutesArray && minutesArray.length > 0,
        }));
      }
      this.setState(prevState => ({
        selectedElementTime: minutesArray ? selectedElementTime : null,
        selectedTime: {
          selectedPrice: prevState.selectedPrice,
          dateTime: selected,
        },
        minutesArray,
      }), () => {
        setTimeout(() => {
          if (this.myScroll) {
            this.myScroll.scrollTo({
              x: 48 * (selectedElementTime - 3),
            });
          }
        }, 1);
      });
    } else { this.toggleDisablePay(true); }
  }

  onSelectMinutes = (elem) => {
    this.toggleDisablePay(false);
    const { selectedTime, selectedPrice } = this.state;
    const { practitioner, navigation: { dispatch } } = this.props;
    const selected = new Date(selectedTime.dateTime);
    selected.setMinutes(selected.getMinutes() + parseInt(elem.minutes, 10));
    const canSelect = helpers.checkIfWorkHours({
      practitioner,
      selectedTime: {
        selectedPrice,
        dateTime: selected,
      },
      selectedPrice,
    });
    if (canSelect) {
      const { visibleMinutesPopup } = this.props;
      dispatch(toggleMinutesPopup({ visibleMinutesPopup: !visibleMinutesPopup }));
      this.setState(prevState => ({
        selectedTime: {
          selectedPrice: prevState.selectedPrice,
          dateTime: selected,
        },
      }));
    } else {
      this.toggleDisablePay(true);
      this.toggleModal();
    }
  }

  toggleModal = () => {
    const { visibleMinutesPopup, navigation: { dispatch } } = this.props;
    dispatch(toggleMinutesPopup({ visibleMinutesPopup: !visibleMinutesPopup }));
  }

  onSelectPrice = (selectedPrice) => {
    this.toggleDisablePay(false);
    const { practitioner } = this.props;
    const { selectedTime } = this.state;
    const canSelect = helpers.checkIfWorkHours({ practitioner, selectedTime, selectedPrice });
    if (canSelect) {
      this.calculation.setPrice(selectedPrice);
      this.setState(prevState => ({
        selectedPrice,
        totalPrice: this.calculation.getTotalPrice(),
        selectedTime: {
          selectedPrice,
          dateTime: prevState.dateTime ? prevState.dateTime : selectedTime.dateTime,
        },
      }));
    } else { this.toggleDisablePay(true); }
  }

  onSelectDate = (day) => {
    this.toggleDisablePay(false);
    const { disabledDays, selectedTime, selectedPrice } = this.state;
    const { practitioner } = this.props;
    if (!Object.keys(disabledDays).includes(day.dateString)) {
      const selected = new Date(day.dateString);
      const newSelectedDate = new Date(selectedTime.dateTime);
      newSelectedDate.setDate(selected.getDate());
      newSelectedDate.setMonth(selected.getMonth());
      newSelectedDate.setFullYear(selected.getFullYear());
      const canSelect = helpers.checkIfWorkHours({
        practitioner,
        selectedTime: {
          selectedPrice,
          dateTime: newSelectedDate,
        },
        selectedPrice,
      });
      if (canSelect) {
        this.setState(prevState => ({
          selectedDate: day.dateString,
          selectedTime: {
            selectedPrice: prevState.selectedPrice,
            dateTime: newSelectedDate,
          },
        }));
      }
    } else {
      helpers.showAlert('The practitioner doesn`t work this day');
      this.toggleDisablePay(true);
    }
  }

  getMarkedDates = ({ practitioner, sessions }) => {
    const { profile } = this.props;
    let markedDates;
    const disabledDays = helpers.getDaysInMonth(
      moment().month(), moment().year(), practitioner.workWeek,
    );
    this.setState({ disabledDays });
    if (sessions) {
      Object.values(sessions).forEach((session) => {
        if (session.details.profileClient.uid === profile.uid
          && session.status !== SESSIONS_STATUSES.canceled
          && session.status !== SESSIONS_STATUSES.declined) {
          markedDates = {
            ...markedDates,
            [session.selectedDate]: { selected: true, marked: true },
          };
        }
      });
    }
    markedDates = { ...markedDates, ...disabledDays };
    this.setState({ markedDates });
  }

  setPreviewImage = index => this.setState({ imagePreview: true, imagePreviewIndex: index })

  handlePay = () => {
    const {
      selectedTime, selectedDate, selectedPrice, changeDefaultCard,
    } = this.state;
    const { navigation: { navigate, dispatch }, sessions, profile } = this.props;
    const {
      available,
      message,
    } = helpers.checkFreeBookTime({
      sessions, selectedTime, selectedPrice, selectedDate,
    });
    const goToPayment = changeDefaultCard || !hasStripeAccount(profile);
    const nextRoute = goToPayment ? 'Payment' : 'TodaysAudition';

    if (available) {
      dispatch(setTimeDate({ selectedTime, selectedDate }));
      if (selectedPrice.type && selectedPrice.type === 'service' && !goToPayment) {
        this.creteBookSession();
      } else {
        navigate(
          nextRoute,
          { backScreen: 'Book' },
        );
      }
    } else dispatch(showAlert(message));
  }

  creteBookSession = () => {
    const { dispatch } = this.props;
    dispatch(setAuditionDetails({
      projectName: '',
      characterName: '',
      scenes: '',
      agent: '',
      manager: '',
      website: '',
      email: '',
    }));
    dispatch(createSessionsAttempt());
  }

  navigateToPractitionerBio = () => {
    const { navigation } = this.props;
    navigation.navigate(
      'Practitioner',
      { backScreen: 'Book' },
    );
  }

  timeArray = () => {
    this.setState({
      timline: helpers.returnTimeArray(),
    }, () => {
      this.onTimeChange(moment().add(0, 'hours').hour());
    });
  }

  toggleMap = () => {
    let toValue = maxMap;
    if (this.mapFlex._value === maxMap) toValue = minMap;
    Animated.spring(this.mapFlex, {
      toValue,
      duration: 500,
    }).start();
  }

  convertImagesToObjects = () => {
    const { practitioner } = this.props;
    return practitioner.setup.map((item) => {
      return { url: item };
    });
  }

  render() {
    const {
      imagePreview,
      markedDates,
      imagePreviewIndex,
      totalPrice,
      selectedElementTime,
      minutesArray,
      timline,
      selectedDate,
      selectedPrice,
      changeDefaultCard,
      disablePay,
    } = this.state;


    const {
      navigation,
      navigation: {
        state: {
          params: {
            backScreen,
          },
        },
      },
      isLoading,
      practitioner,
      sessions,
      profile,
      visibleMinutesPopup,
    } = this.props;

    return (
      practitioner && (
      <MainWrapper
        navigation={navigation}
        pageName={practitioner.username}
        goBackScreen={backScreen}
      >
        <Fragment>
          <Modal visible={imagePreview} transparent>
            <ImageViewer
              enablePreload
              enableSwipeDown
              onSwipeDown={() => { this.setState({ imagePreview: false }); }}
              imageUrls={this.convertImagesToObjects()}
              loadingRender={() => <ActivityIndicator />}
              index={imagePreviewIndex}
            />
          </Modal>
          <View style={styles.container}>
            <PractitionerInfo
              practitioner={practitioner}
              navigateToPractitionerBio={this.navigateToPractitionerBio}
              setPreviewImage={this.setPreviewImage}
            />
            <Animated.View
              style={[styles.containerMap, { height: this.mapFlex }]}
            >
              <BookMap
                location={practitioner && practitioner.location}
                onPress={this.toggleMap}
              />
            </Animated.View>
            <SessionsAndService
              onSelectPrice={this.onSelectPrice}
              selectedPrice={selectedPrice}
              practitioner={practitioner}
            />
            <View style={styles.calendar}>
              <Agenda
                onDayPress={day => this.onSelectDate(day)}
                markedDates={markedDates}
                minDate={allowDate}
                theme={agendaStyle}
              />
            </View>
            <TimePicker
              toggleModal={this.toggleModal}
              setRef={(ref) => { this.myScroll = ref; }}
              sessions={sessions}
              practitioner={practitioner}
              selectedElementTime={selectedElementTime}
              minutesArray={minutesArray}
              timline={timline}
              selectedDate={selectedDate}
              visibleMinutesPopup={visibleMinutesPopup}
              onTimeChange={this.onTimeChange}
              onSelectMinutes={this.onSelectMinutes}
            />
            <BookButton
              disablePay={disablePay}
              totalPrice={totalPrice}
              selectedElementTime={selectedElementTime}
              handlePay={this.handlePay}
              calculation={this.calculation}
              changeDefaultCard={changeDefaultCard}
              onChangeDefaultCard={this.onChangeDefaultCard}
              hasStripeAccount={hasStripeAccount(profile)}
            />
          </View>
        </Fragment>
        <CustomActivityIndicator text="No data found" isLoading={isLoading} showNoData={false} />
      </MainWrapper>
      ));
  }
}

const mapStateToProps = ({
  sessionsReducer: { sessions, isLoading },
  authorizationReducer: {
    profile,
  },
  bookReducer: {
    location,
    practitioner,
    visibleMinutesPopup,
  },
  userDetails: {
    member,
  },
}) => ({
  sessions,
  isLoading,
  profile,
  location,
  practitioner,
  member,
  visibleMinutesPopup,
});

BookSession.propTypes = {
  navigation: PropTypes.shape({}),
  sessions: PropTypes.shape([]),
  member: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
  location: PropTypes.shape({}).isRequired,
  practitioner: PropTypes.shape({}).isRequired,
  visibleMinutesPopup: PropTypes.bool,
};

BookSession.defaultProps = {
  navigation: {},
  sessions: null,
  profile: null,
  member: null,
  visibleMinutesPopup: false,
};

export default connect(mapStateToProps)(BookSession);
