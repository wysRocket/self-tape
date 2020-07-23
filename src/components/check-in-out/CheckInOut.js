import React, { Component, Fragment } from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
  Platform,
  View,
  Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getSessionAttempt, sessionsUpdateAttempt, refreshSessionAttempt } from '../../actions/sessions';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import CheckInOutPractitioner from './CheckInPractitioner';
import CheckOutUser from './CheckOutUser';
import RatePerson from './RatePerson';
import Question from './Question';
import ReviewPerson from './ReviewPerson';
import AnswerQuestion from './AnswerQuestion';
import MainWrapper from '../../share/MainWrapper';
import { locale } from '../../constants/textConstants';
import { SESSIONS_STATUSES } from '../../constants/apiConstants';
import COLORS from '../../constants/colorsConstants';
import { ratePersonAttempt } from '../../actions/reviews';

import infoStyle from '../../styles/MainStyles';

const { width, height } = Dimensions.get('window');
const EXTRA_SCROLL_HEIGHT = Platform.OS === 'ios' ? 80 : 0;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginBottom: 15,
  },
  ContentContainer: {
    width,
  },
  SessionStatusContainer: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.8,
  },
});

class CheckInOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      reviewRating: 0,
      answers: [],
      scrollOffset: width,
    };
    this.scrollView = null;
  }

  componentDidMount = () => {
    const {
      navigation: { dispatch },
      profile,
    } = this.props;
    dispatch(getSessionAttempt({ uid: profile.uid }));
  }

  onRefreshSession = () => {
    const {
      navigation: { dispatch },
      profile,
    } = this.props;
    dispatch(refreshSessionAttempt({ uid: profile.uid }));
  }

  navigateToNextPage = (page, person) => {
    const {
      navigation,
      currentHourSession: { sessionInfo: { uid } },
    } = this.props;
    navigation.navigate(page, { person, sessionUid: uid });
  }

  formatAmPm = () => {
    const { currentHourSession: { sessionInfo: { selectedTime: { dateTime } } } } = this.props;
    const timeStart = moment(dateTime);
    return timeStart.format('dddd MMMM DD, YYYY hh:mm A').toUpperCase();
  }

  changeSessionsStatus = (newStatus) => {
    const {
      dispatch,
      currentHourSession: { sessionInfo },
    } = this.props;
    const offset = new Date().getTimezoneOffset();
    const timestamp = new Date(new Date().getTime() + offset);

    dispatch(sessionsUpdateAttempt({
      ...sessionInfo,
      ...{ newStatus },
      ...{ [`${newStatus}Time`]: timestamp.getTime() },
    }));
  }

  onStarRatingPress = (rating) => {
    this.setState({ reviewRating: rating });
    this.onScrollNext();
  }

  onAnswer = ({ answer, question }) => {
    const { answers } = this.state;
    const answersTemp = answers;
    answersTemp.push({
      answerUid: question.uid,
      answer,
    });
    this.setState({ answers: answersTemp });
    this.onScrollNext();
  }

  handleChangeReview = review => this.setState({ review });

  onChangeScrollOffset = () => {
    this.setState(prevState => ({ scrollOffset: prevState.scrollOffset + width }));
  }

  onScrollNext = () => {
    const { scrollOffset } = this.state;
    this.scrollView.scrollTo({ x: scrollOffset, y: 0, animated: true });
    this.onChangeScrollOffset();
  }

  sendData = () => {
    const {
      navigation: {
        dispatch,
        navigate,
      },
      profile,
    } = this.props;
    const { review, reviewRating, answers } = this.state;
    dispatch(ratePersonAttempt({
      review,
      reviewRating,
      answers,
    }));
    navigate(profile.role === 'user' ? 'Home' : 'Dashboard');
  }

  render() {
    const {
      currentHourSession, isLoading, isRefreshing, navigation, profile,
    } = this.props;
    const { reviewRating, review } = this.state;
    const person = currentHourSession && (
      profile.role === 'practitioner' ? currentHourSession.userProfile : currentHourSession.practitionerProfile
    );

    const showIfUser = (currentHourSession
      && profile.role !== 'practitioner'
      && currentHourSession.sessionInfo.status === SESSIONS_STATUSES.finished);

    const showSessionInfo = currentHourSession && (showIfUser || profile.role === 'practitioner');

    return (
      <MainWrapper
        navigation={navigation}
        pageName={locale.checkInOutPage}
        goBackScreen="FinishedSessions"
      >
        <KeyboardAwareScrollView
          style={styles.Container}
          contentContainerStyle={styles.ContentContainer}
          extraScrollHeight={EXTRA_SCROLL_HEIGHT}
          refreshControl={(
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefreshSession}
            />
          )}
        >
          {!isLoading && currentHourSession && (
          <Fragment>
            {showSessionInfo ? (
              <Fragment>
                {profile.role === 'practitioner' ? (
                  <CheckInOutPractitioner
                    person={person}
                    session={currentHourSession.sessionInfo}
                    changeSessionsStatus={this.changeSessionsStatus}
                  />
                ) : (
                  <CheckOutUser
                    person={person}
                    session={currentHourSession.sessionInfo}
                    locationInfo={currentHourSession.locationInfo}
                  />
                )}

                {currentHourSession.sessionInfo.status === SESSIONS_STATUSES.finished && (
                  <ScrollView
                    ref={(scrollView) => { this.scrollView = scrollView; }}
                    horizontal
                    decelerationRate={0}
                    snapToInterval={width}
                    snapToAlignment="center"
                    pagingEnabled
                    scrollEnabled={false}
                  >
                    <Question
                      person={person}
                      question={`Please Rate ${person.username}`}
                    >
                      <RatePerson
                        onStarRatingPress={this.onStarRatingPress}
                        reviewRating={reviewRating}
                      />
                    </Question>
                    {currentHourSession.questions.map(elem => (
                      <Question
                        key={elem.question}
                        person={person}
                        question={elem.question.replace('name', person.username)}
                      >
                        <AnswerQuestion
                          onAnswer={this.onAnswer}
                          question={elem}
                        />
                      </Question>
                    ))}
                    <Question
                      person={person}
                      question="Comments"
                    >
                      <ReviewPerson
                        handleChangeReview={this.handleChangeReview}
                        review={review}
                        sendData={this.sendData}
                      />
                    </Question>
                  </ScrollView>
                )}
              </Fragment>
            ) : (
              <View style={styles.SessionStatusContainer}>
                <Text style={[infoStyle.text, { fontSize: 25, color: COLORS.MAIN_BLUE }]}>
                  {`Session is ${currentHourSession.sessionInfo.status}`}
                </Text>
              </View>
            )}
          </Fragment>
          )}
        </KeyboardAwareScrollView>
        <CustomActivityIndicator
          text={locale.noSessionsFound}
          isLoading={isLoading}
          showNoData={currentHourSession === null}
        />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({
  authorizationReducer: {
    profile,
  },
  sessionsReducer: {
    isLoading,
    isRefreshing,
    currentHourSession,
  },
}) => ({
  isLoading,
  isRefreshing,
  currentHourSession,
  profile,
});
CheckInOut.propTypes = {
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  screenProps: PropTypes.shape({}).isRequired,
  currentHourSession: PropTypes.shape({}),
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
};

CheckInOut.defaultProps = {
  currentHourSession: null,
};

export default connect(mapStateToProps)(CheckInOut);
